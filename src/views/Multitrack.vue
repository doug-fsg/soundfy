<template>
  <div>
    <header class="site-header py-3">
      <!-- <b-modal id="modal-scoped" ref="modal" title="Salvar projeto">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Nome da música" label-for="subject">
            <b-form-input
              id="subject"
              v-model.trim="$v.form.subject.$model"
              type="text"
              required
              autocomplete="off"
              aria-describedby="subject-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="subject-feedback">Campo obrigatório.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Descrição" label-for="description">
            <b-form-textarea id="description" v-model.trim="form.description" required autocomplete="off"></b-form-textarea>
          </b-form-group>
          <b-button type="submit" variant="outline-primary" @click="saveTask">
            <i class="fas fa-save"></i> Salvar
          </b-button>
          <b-button variant="danger" @click="$bvModal.hide('modal-scoped')">Cancelar</b-button>
        </form>
      </b-modal> -->
      
      <b-modal id="modal-scoped" ref="modal" title="Salvar projeto">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Nome da música" label-for="subject">
            <b-form-input id="subject" v-model.trim="$v.form.subject.$model" type="text" required autocomplete="off"
              aria-describedby="subject-feedback"></b-form-input>
            <b-form-invalid-feedback id="subject-feedback">Campo obrigatório.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Descrição" label-for="description">
            <b-form-textarea id="description" type="text" required autocomplete="off"></b-form-textarea>
          </b-form-group>
        </form>
        <template #modal-footer="{ ok, cancel }">

          <b-button type="submit" variant="outline-primary" @click="saveTask">

            <i class="fas fa-save"></i> Salvar
          </b-button>
          <b-button variant="danger" @click="cancel()">
            Cancelar
          </b-button>
        </template>
      </b-modal>






      <link rel="stylesheet" href="/css/main.css">
      <link rel="alternate" type="application/rss+xml" title="Waveform Playlist"
        href="https://naomiaro.github.io/waveform-playlist/feed.xml">

      <link src="https://kit.fontawesome.com/ef69927139.js" crossorigin="anonymous">

      <div class="container">
        <div class="d-flex justify-content-end align-items-center">
          <div class="form-check form-switch ms-auto">
            <!-- <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" @click="toggleDarkMode">
             <label class="form-check-label" for="flexSwitchCheckChecked">Modo Escuro</label>-->
          </div>
        </div>
      </div>

    </header>






    <main class="container" title="demo">

      <div class="wrapper">
        <article class="post">
          <header class="post-header">
            <h1 class="post-title">Modo Produção</h1>
             <!-- <p class="lead">Worship</p> -->
            <button id="hertjzjs-load-editor" style="display: none;">Load</button>
            <button id="hertjzjs-commit" :disabled="true" style="display: none;">commit</button>
            <button id="hertjzjs-undo" style="display: none;">Undo</button>
            <button id="hertjzjs-redo" style="display: none;">Redo</button>
            <!-- <button id="hertjzjs-show-json">Show Json</button>-->
            <button id="hertjzjs-show-json" :disabled="true" style="display: none;">Recarregar</button>
            <button id="hertjzjs-copy-from" style="display: none;">Copy from hertzjs</button>
            <button id="hertjzjs-export" :data-file-name="id_arquivo_save" :disabled="true"
              style="display: none;">Exportar Projeto</button>
            <input type="file" id="hertzjs-project-file" />
            <!-- <button id="hertjzjs-export" data-file-name="nome-do-arquivo.zip">Exportar Projeto</button>-->
            <!--<button id="hertjzjs-export2" :data-file-name="id_arquivo_save" @click="saveTask">Exportar Projeto3</button>-->


            <!-- Adicione os eventos e métodos necessários para os botões -->
            <!-- Exemplo: <button @click="loadEditor">Load Editor</button> -->
          </header>
          <div class="post-content">

            <div id="top-bar" class="playlist-top-bar">
              <div class="playlist-toolbar">
                <div class="btn-group">
                  <button type="button" class="btn-pause btn btn-outline-warning" title="Pause">
                    <i class="fas fa-pause"></i>
                  </button>
                  <button type="button" class="btn-play btn btn-outline-success" title="Play">
                    <i class="fas fa-play"></i>
                  </button>
                  <button type="button" class="btn-stop btn btn-outline-danger" title="Stop">
                    <i class="fas fa-stop"></i>
                  </button>
                  <button type="button" class="btn-rewind btn btn-outline-success" title="Rewind">
                    <i class="fas fa-fast-backward"></i>
                  </button>
                  <button type="button" class="btn-fast-forward btn btn-outline-success" title="Fast forward">
                    <i class="fas fa-fast-forward"></i>
                  </button>
                  <button type="button" class="btn-record btn btn-outline-primary disabled" title="Record">
                    <i class="fas fa-microphone"></i>
                  </button>
                </div>

                <div class="btn-group">
                  <button type="button" title="Zoom in" class="btn-zoom-in btn btn-outline-dark">
                    <i class="fas fa-search-plus"></i>
                  </button>
                  <button type="button" title="Zoom out" class="btn-zoom-out btn btn-outline-dark">
                    <i class="fas fa-search-minus"></i>
                  </button>
                </div>




                <div class="btn-group btn-playlist-state-group">
                  <button type="button" class="btn-cursor btn btn-outline-dark active" title="Select cursor">
                    <i class="fas fa-headphones"></i>
                  </button>
                  <button type="button" class="btn-select btn btn-outline-dark" title="Select audio region">
                    <i class="fas fa-italic"></i>
                  </button>
                  <button type="button" class="btn-shift btn btn-outline-dark" title="Shift audio in time">
                    <i class="fas fa-arrows-alt-h"></i>
                  </button>
                  <button type="button" class="btn-fadein btn btn-outline-dark" title="Set audio fade in">
                    <i class="fas fa-long-arrow-alt-left"></i>
                  </button>
                  <button type="button" class="btn-fadeout btn btn-outline-dark" title="Set audio fade out">
                    <i class="fas fa-long-arrow-alt-right"></i>
                  </button>
                </div>

                <div class="btn-group btn-fade-state-group">
                  <button type="button" class="btn btn-sm btn-outline-dark btn-logarithmic active">logarithmic</button>
                  <button type="button" class="btn btn-sm btn-outline-dark btn-linear">linear</button>
                  <button type="button" class="btn btn-sm btn-outline-dark btn-exponential">exponential</button>
                  <button type="button" class="btn btn-sm btn-outline-dark btn-scurve">s-curve</button>
                </div>

                <div class="btn-group btn-select-state-group">
                  <button type="button" class="btn-loop btn btn-outline-success disabled"
                    title="Loop a selected segment of audio">
                    <i class="fas fa-redo-alt"></i>
                  </button>
                  <button type="button" title="Keep only the selected audio region for a track"
                    class="btn-trim-audio btn btn-outline-primary disabled">
                    Deixar
                  </button>

                  <button type="button" title="Split selected audio"
                    class="btn-split-audio btn btn-outline-primary disabled">
                    Dividir
                  </button>
                  <button type="button" title="Cut selected audio" class="btn-cut-audio btn btn-outline-primary disabled">
                    Remover
                  </button>
                </div>
                <div class="btn-group">
                  <button type="button" title="Print playlist info to console" class="btn btn-outline-info print">
                    Print
                  </button>
                  <button type="button" title="Clear the playlist's tracks" class="btn btn-clear btn-outline-danger">
                    Clear
                  </button>
                </div>
                <div class="btn-group">
                  <b-button type="button" title="Salvar projeto" variant="outline-dark"
                    @click="$bvModal.show('modal-scoped')">
                    <i class="fas fa-save"></i>
                  </b-button>
                  <button type="button" title="Baixe o projeto atual como arquivo .wav"
                    class="btn btn-download btn-outline-primary">
                    <i class="fas fa-download"></i>
                  </button>

                  <button type="button" title="Baixe o projeto atual como arquivo .mp3"
                    class="btn btn-download-mp3 btn-outline-info">
                    Download mp3
                  </button>
                  <button type="button" title="Baixe o projeto atual como arquivo .opus"
                    class="btn btn-download-opus btn-outline-info">
                    Download opus
                  </button>
                  <button type="button" title="Baixe o projeto atual como arquivo .aac"
                    class="btn btn-download-aac btn-outline-info">
                    Download aac
                  </button>


                  <form class="form-inline d-flex">
                    <div class="form-group">
                      <input type="number" class="form-control" placeholder="Procure o tempo" maxlength="2" id="seektime"
                        style="max-width: 100px;" />
                    </div>
                    <button type="button" class="btn btn-outline-primary btn-seektotime"
                      title="ir para o tempo">Ir</button>
                  </form>

                </div>

              </div>
            </div>
            <div id="playlist"></div>
            <div class="playlist-bottom-bar">

              <div class="playlist-bottom-bar">
                <form class="form-inline">
                  <select class="time-format custom-select mr-sm-2" aria-label="Time format selection">
                    <option value="seconds">seconds</option>
                    <option value="thousandths">thousandths</option>
                    <option value="hh:mm:ss">hh:mm:ss</option>
                    <option value="hh:mm:ss.u">hh:mm:ss + tenths</option>
                    <option value="hh:mm:ss.uu">hh:mm:ss + hundredths</option>
                    <option value="hh:mm:ss.uuu" selected="selected">hh:mm:ss + milliseconds</option>
                  </select>
                  <label class="sr-only" for="audio_start">Start of audio selection</label>
                  <input type="text" class="audio-start form-control mr-sm-2" id="audio_start">
                  <label class="sr-only" for="audio_end">End of audio selection</label>
                  <input type="text" class="audio-end form-control mr-sm-2" id="audio_end">
                  <span class="audio-pos" aria-label="Audio position">00:00:00.0</span>
                </form>

                <form class="form-inline">
                  <div class="form-inline">
                    <label for="master-gain"></label>
                    Master
                    <input type="range" class="master-gain form-control-range" id="master-gain">

                    <div class="form-check form-check-inline">
                      <input class="form-check-input automatic-scroll" type="checkbox" id="automatic_scroll" />
                      <label class="form-check-label" for="automatic_scroll">Volume Automático</label>
                    </div>
                  </div>
                  <div class="track-drop"></div>
                  <div class="loading-data"></div>



                </form>







              </div>
            </div>
          </div>
        </article>
      </div>

    </main>



  </div>
</template>

<script>


import ToastMixin from "@/mixins/toastMixin.js";
import { required, minLength } from "vuelidate/lib/validators";
import TasksModel from "@/models/TasksModel";
import Status from "@/valueObjects/status";


export default {
  name: "Form",
  mixins: [ToastMixin],
  data() {
    return {
      mostrarBotao: false,
      id_arquivo_save: "",
      form: {
        subject: "",
        description: "",
        status: Status.OPEN,
        dateOverdue: "",
        userId: JSON.parse(localStorage.getItem("authUser")).id,
      },
    };
  },
  validations: {
    form: {
      subject: {
        required,
        minLength: minLength(3),
      },
    },
  },


  mounted() {


    this.loadScripts();

    // Espera 5 segundos antes de alterar o estado isLoading para false
    // setTimeout(() => {
    //   const button = document.getElementById('hertjzjs-show-json');
    // button.click();
    // }, 1000);
    setTimeout(() => {
      const button = document.getElementById('hertjzjs-show-json');
      button.removeAttribute('disabled'); // Habilita o botão
      button.style.visibility = 'visible'; // Torna o botão visível
      button.click(); // Simula o clique no botão
      console.log("apertou o botao Recarregar")
    }, 1000);




  },
  methods: {
    async saveTask() {
      this.$v.$touch();
      if (this.$v.$error) return;

      const task = new TasksModel(this.form);
      const response = await task.save();
      console.log("logg", response.id);
      this.id_arquivo_save = response.id;

      //   setTimeout(() => {
      //   const button = document.getElementById('hertjzjs-export');
      //  button.click();
      // }, 2000);


      setTimeout(() => {
        const button = document.getElementById('hertjzjs-export');
        const commit = document.getElementById('hertjzjs-commit');
        button.removeAttribute('disabled'); // Habilita o botão
        button.style.visibility = 'visible'; // Torna o botão visível
        commit.removeAttribute('disabled'); // Habilita o botão
        commit.style.visibility = 'visible'; // Torna o botão visível
        commit.click();
        button.click(); // Simula o clique no botão
        console.log("apertou o botao")
        this.$bvModal.hide('modal-scoped');
      }, 2000);
      await this.showToast("success", "Sucesso!", "Musica salva com suceso");
      // this.$router.push({ name: "list" });

    },

    // getValidation() {
    //   if (this.$v.form.subject.$dirty === false) {
    //     return null;
    //   }
    //   return !this.$v.form.subject.$error;
    // },








    loadScripts() {
      const scripts = [
        "https://code.jquery.com/jquery-3.6.0.min.js",
        "js/waveform-playlist.js",
        "js/web-audio-editor.js",
        "js/emitter.js",
        "https://kit.fontawesome.com/ef69927139.js",
      ];

      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          const scriptElement = document.createElement("script");
          scriptElement.src = src;
          scriptElement.async = false;
          scriptElement.onload = resolve;
          scriptElement.onerror = reject;
          document.body.appendChild(scriptElement);
        });
      };

      const loadNextScript = (index) => {
        if (index < scripts.length) {
          loadScript(scripts[index])
            .then(() => loadNextScript(index + 1))
            .catch((error) => console.error("Failed to load script:", error));
        }
      };

      loadNextScript(0);
    },





    toggleDarkMode() {
      document.body.classList.toggle("dark-mode");
      document.querySelectorAll(".form-inline").forEach(element => {
        element.classList.toggle("dark-mode");
      });
    },
    // Adicione métodos para os outros botões, se necessário
  },
};
</script>

<style>
/* Adicione estilos CSS aqui */
</style>
