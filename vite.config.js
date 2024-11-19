import { defineConfig } from "vite";

export default defineConfig({
  // Configuração para o build
  build: {
    outDir: "dist", // Define a pasta de saída como 'dist'
    target: "esnext", // Usa a versão mais recente do ECMAScript para o código gerado
    modulePreload: true, // Garante o pré-carregamento dos módulos
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },

  // Configuração para resolver arquivos .ts e .js corretamente
  resolve: {
    extensions: [".ts", ".js"], // Permite importar arquivos .ts e .js sem a necessidade de extensão
  },
});
