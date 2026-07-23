class TranslateService{
    async translate(data){
        const response = await fetch("http://127.0.0.1:8000/translate", {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                text: data,
                language: "french"
            })
        });

        const result = await response.json();
        return result;
    }
}

module.exports = new TranslateService();