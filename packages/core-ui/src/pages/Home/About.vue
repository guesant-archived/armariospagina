<template>
  <div class="bg-gray-100 text-gray-900 font-semibold py-48">
    <div class="container mx-auto max-w-4xl w-full px-4 lg:px-0">
      <section class="grid grid-cols-12">
        <div class="col-span-4">
          <img src="@/assets/images/pho02-ar01.jpeg" alt="É oq" />
        </div>

        <div class="row-start-2 col-span-12 md:row-start-1 md:col-span-6 md:col-start-7">
          <h1 class="mt-10 mb-2 md:mt-0 md:mb-4 text-4xl font-bold topic-title">Entenda</h1>

          <p>Nós do grupo Amazônia Grupo estamos em guerra com a Armários Página.</p>
          <p
            class="mt-4"
          >Esse site apresenta uma ferramenta usada como arma, mas é uma ótima ferramenta que pode ser usada para fazer imagens em geral hehe.</p>
          <p class="mt-4">Sim, estamos utilizando o nome de nosso rival como arma.</p>
        </div>
      </section>

      <section class="grid grid-cols-12 mt-48">
        <div class="col-span-4 md:row-start-1 md:col-start-9">
          <img src="@/assets/images/pho03-ar02.jpeg" alt="Grupo Raqueado" />
        </div>

        <div class="row-start-2 col-span-12 md:row-start-1 md:col-span-7">
          <h1 class="mt-10 mb-2 md:mt-0 md:mb-4 text-4xl font-bold topic-title">Hackeando Whatsapp</h1>

          <p>Ferramenta criada por Gabriel Rodrigues, usando Vue.js & Jimp. Projeto licensiado sobre GPL-3.0.</p>

          <p class="font-bold mt-4">O Projeto</p>
          <ul>
            <li
              class="max-w-full overflow-x-auto whitespace-no-wrap"
            >- https://github.com/guesant/armariospagina (código fonte)</li>
          </ul>

          <p class="font-bold mt-4">Gabriel Rodrigues (whatsapp hacker)</p>
          <ul>
            <li>- https://twitter.com/GabrielBurr0</li>
            <li>- https://github.com/guesant</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.topic-title {
  &::before {
    content: "";
    display: inline-block;
    width: theme("spacing.2");
    height: 1.75rem;
    margin-right: theme("spacing.3");

    background-color: currentColor;
  }
}
</style>
