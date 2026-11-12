
const estado = document.getElementById("estado");
const cidade = document.getElementById("cidade");
const resultado = document.getElementById("resultado");

async function carregarEstados() {

    try {

        const resposta = await fetch(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        );

        const estados = await resposta.json();

        estados.sort((a, b) => a.nome.localeCompare(b.nome));

        estado.innerHTML = '<option value="">Selecione um estado</option>';

        estados.forEach(function (item) {

            const opcao = document.createElement("option");

            opcao.value = item.sigla;
            opcao.textContent = item.nome;

            estado.appendChild(opcao);

        });

    } catch (erro) {

        estado.innerHTML = '<option value="">Erro ao carregar estados</option>';

    }
}

async function carregarCidades() {

    const uf = estado.value;

    cidade.innerHTML = '<option value="">Carregando cidades...</option>';
    cidade.disabled = true;

    resultado.innerHTML = "";

    if (uf === "") {
        cidade.innerHTML = '<option value="">Selecione um estado primeiro</option>';
        return;
    }

    try {

        const resposta = await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
        );

        const cidades = await resposta.json();

        cidade.innerHTML = '<option value="">Selecione uma cidade</option>';

        cidades.forEach(function (item) {

            const opcao = document.createElement("option");

            opcao.value = item.nome;
            opcao.textContent = item.nome;

            cidade.appendChild(opcao);

        });

        cidade.disabled = false;

    } catch (erro) {

        cidade.innerHTML = '<option value="">Erro ao carregar cidades</option>';

    }
}

function mostrarResultado() {

    if (estado.value !== "" && cidade.value !== "") {

        const nomeEstado = estado.options[estado.selectedIndex].text;

        resultado.innerHTML =
            `Você selecionou: ${cidade.value} - ${nomeEstado}`;

    } else {

        resultado.innerHTML = "";

    }
}

estado.addEventListener("change", carregarCidades);

cidade.addEventListener("change", mostrarResultado);

carregarEstados();
