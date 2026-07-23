class TranslateService {
    async translate(text, language) {
        try {
            const response = await fetch("https://amberscript.onrender.com/translate", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: text,
                    language: language || "French"
                })
            });

            if (!response.ok) {
                const errBody = await response.text();
                throw new Error(`Python translation service returned error ${response.status}: ${errBody}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error in TranslateService:", error.message);
            throw error;
        }
    }
}

module.exports = new TranslateService();