const callImageGenerator = async (text) => {
    if (!text) return;

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_HUGGING_FACE_API_KEY}`,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                },
                body: JSON.stringify({
                    inputs: text,
                    parameters: {
                        negative_prompt: "blurry, bad quality, black image, distorted, deformed",
                        num_inference_steps: 30,
                        guidance_scale: 7.5,
                        width: 768,
                        height: 768
                    }
                }),
                mode: "cors",
                credentials: "same-origin"
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Failed with status: ${response.status}`);
        }

        const blob = await response.blob();
        if (blob.size === 0) {
            throw new Error('Generated image is empty');
        }

        // Create download URL and add timestamp to filename
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        
        return {
            url,
            download: {
                url,
                filename: `generated-image-${timestamp}.png`,
                blob
            }
        };
    } catch (error) {
        console.error("Image generation error details:", error);
        throw new Error(`Image generation failed: ${error.message}`);
    }
};

export default callImageGenerator;