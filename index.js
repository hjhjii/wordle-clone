let word = "fdsfdsfd"
fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then(res => {
        if (res.status != 200) throw new Error("Sussy Error");
        return res.json;
    })
    .then(data => console.log(data))
    .catch(error => console.log(error))