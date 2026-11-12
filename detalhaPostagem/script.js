
const usuario = document.getElementById("usuario");
const postagens = document.getElementById("postagens");

async function carregarUsuarios() {

    try {

        const resposta = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const usuarios = await resposta.json();

        usuario.innerHTML = '<option value="">Selecione um autor</option>';

        usuarios.forEach(function(item) {

            const opcao = document.createElement("option");

            opcao.value = item.id;
            opcao.textContent = item.name;

            usuario.appendChild(opcao);

        });

    } catch (erro) {

        usuario.innerHTML = '<option value="">Erro ao carregar usuários</option>';

    }
}


async function carregarPostagens() {

    const idUsuario = usuario.value;

    postagens.innerHTML = "";

    if (idUsuario === "") {
        return;
    }

    postagens.innerHTML = "Carregando postagens...";

    try {

        const resposta = await fetch(
            `https://jsonplaceholder.typicode.com/posts?userId=${idUsuario}`
        );

        const dados = await resposta.json();

        postagens.innerHTML = "";

        dados.forEach(function(item) {

            const div = document.createElement("div");

            div.className = "postagem";

            div.innerHTML = `
                <h3 class="titulo" onclick="mostrarDetalhes(${item.id}, this)">
                    ${item.title}
                </h3>

                <div class="detalhes"></div>
            `;

            postagens.appendChild(div);

        });

    } catch (erro) {

        postagens.innerHTML =
            "<p class='erro'>Erro ao carregar postagens.</p>";

    }
}


async function mostrarDetalhes(id, titulo) {

    const detalhes = titulo.nextElementSibling;

    if (detalhes.dataset.carregado === "true") {
        detalhes.hidden = !detalhes.hidden;
        return;
    }

    detalhes.hidden = false;
    detalhes.innerHTML = "Carregando detalhes...";

    try {

        const respostaPostagem = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        const postagem = await respostaPostagem.json();

        const respostaComentarios = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );

        const comentarios = await respostaComentarios.json();

        detalhes.innerHTML = `
            <h4>Conteúdo da postagem:</h4>

            <p>${postagem.body}</p>

            <h4>Comentários:</h4>

            ${comentarios.map(function(item) {

                return `
                    <div class="comentario">
                        <strong>${item.name}</strong>
                        <p>${item.body}</p>
                        <small>${item.email}</small>
                    </div>
                `;

            }).join("")}
        `;

        detalhes.dataset.carregado = "true";

    } catch (erro) {

        detalhes.innerHTML =
            "<p class='erro'>Erro ao carregar os detalhes.</p>";

    }
}


usuario.addEventListener("change", carregarPostagens);


carregarUsuarios();
