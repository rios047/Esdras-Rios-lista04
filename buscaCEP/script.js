
async function buscarCEP() {

    const cep = document.getElementById("cep").value;
    const resultado = document.getElementById("resultado");

    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
        resultado.innerHTML =
            "<p class='erro'>CEP inválido! Digite 8 números.</p>";
        return;
    }

    resultado.innerHTML = "Buscando endereço...";

    try {

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cepLimpo}/json/`
        );

        const dados = await resposta.json();

        if (dados.erro) {
            resultado.innerHTML =
                "<p class='erro'>CEP não encontrado!</p>";
            return;
        }

        resultado.innerHTML = `
            <h3>Endereço encontrado:</h3>
            <p><strong>CEP:</strong> ${dados.cep}</p>
            <p><strong>Rua:</strong> ${dados.logradouro}</p>
            <p><strong>Bairro:</strong> ${dados.bairro}</p>
            <p><strong>Cidade:</strong> ${dados.localidade}</p>
            <p><strong>Estado:</strong> ${dados.uf}</p>
        `;

    } catch (erro) {

        resultado.innerHTML =
            "<p class='erro'>Erro ao consultar o CEP. Tente novamente.</p>";

    }
}
