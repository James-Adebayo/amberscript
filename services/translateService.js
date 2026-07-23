class TranslateService{
    async translate(data){
        const response = await fetch("https://amberscript.onrender.com/translate", {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                text: data
            })
        });

        const result = await response.json();
        return result;
    }
}

module.exports = new TranslateService();