// /////////////////////
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const process = $("#progress");
const nextBtn = $(".btn-next");
const preBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playList = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  songs: [
    {
      name: "River Flows In You",
      singer: "Yiruma",
      path: "./audio/RiverFlowsInYou-Yiruma-296757.mp3",
      image:
        "http://xemanhdep.com/wp-content/uploads/2016/05/hinh-anh-3d-suoi-nuoc-dep.jpeg",
    },
    {
      name: "Thu cuối",
      singer: "Yanbi",
      path: "./audio/ThuCuoi-YanbiYenLeDJPharrealPhuongDJDSmall-4850565.mp3",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
    },
    {
      name: "Dấu mưa",
      singer: "Trung Quân",
      path: "./audio/DauMua-TrungQuanIdol-2640897.mp3",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg",
    },
    {
      name: "Mong một ngày em nhớ",
      singer: "Huynh James",
      path: "./audio/MongMotNgayAnhNhoDenEm-HuynhJamesPjnboys-8653756.mp3",
      image:
        "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg",
    },
    {
      name: "Đưa nhau đi trốn",
      singer: "Tuan2T",
      path: "./audio/DuaNhauDiTron-Tuan2T-5333290.mp3",
      image:
        "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg",
    },
    {
      name: "Tháng 4 là lời nói dối của em",
      singer: "Hà Anh Tuấn",
      path: "./audio/ThangTuLaLoiNoiDoiCuaEm-HaAnhTuan-4609544.mp3",
      image:
        "https://static-cms-vovworld.zadn.vn/uploaded/huonggiang/2020_04_27/ha-anh-tuan-3_vmnp.jpg",
    },
    {
      name: "Có chàng trai viết lên cây",
      singer: "Hà Anh Tuấn",
      path: "./audio/CoChangTraiVietLenCay-HaAnhTuan-6803647.mp3",
      image:
        "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp",
    },
  ],
  render() {
    const _this = this;
    const htmls = this.songs.map(function (song, index) {
      let activeSong = "";

      if (index == _this.currentIndex) {
        activeSong = "active";
      } else {
        activeSong = "";
      }
      return `
        <div class="song ${activeSong}" data-index ="${index}">
          <div
            class="thumb"
            style="
              background-image: url('${song.image}');
            "
          ></div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>`;
    });
    playList.innerHTML = htmls.join("");
  },
  defineProperties() {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvent() {
    const _this = this;
    // sroll///////////
    const cdWidth = cd.offsetWidth;
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newcdWidth = cdWidth - scrollTop;
      cd.style.width = newcdWidth > 0 ? newcdWidth + "px" : 0;
      cd.style.opacity = newcdWidth / cdWidth;
    };
    // play///////
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // onplay
    audio.onplay = function () {
      player.classList.add("playing");
      _this.isPlaying = true;
      cdThumbAnimate.play();
    };
    // onpause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };
    // audio tua///////////
    process.onchange = function (e) {
      audio.currentTime = (e.target.value * audio.duration) / 100;
    };
    // audio playing ////////////////////////////
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const processPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        process.value = processPercent;
      }
    };
    ////////quay cd////////////
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdThumbAnimate.pause();
    ////////next song/////////
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }

      audio.play();
    };
    ////////pre song/////////
    preBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.preSong();
      }

      audio.play();
    };
    ///// random btn///////
    randomBtn.onclick = function () {
      if (_this.isRandom) {
        _this.isRandom = false;
        randomBtn.classList.remove("active");
      } else {
        _this.isRepeat = false;
        repeatBtn.classList.remove("active");
        randomBtn.classList.add("active");
        _this.isRandom = true;
      }
    };
    /////////repeat btn//////
    repeatBtn.onclick = function () {
      if (_this.isRepeat) {
        _this.isRepeat = false;
        repeatBtn.classList.remove("active");
      } else {
        _this.isRandom = false;
        randomBtn.classList.remove("active");
        repeatBtn.classList.add("active");
        _this.isRepeat = true;
      }
    };
    ///////////audio end//////
    audio.onended = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else if (_this.isRepeat) {
        _this.loadCurrentSong();
      } else {
        _this.nextSong();
      }
      audio.play();
    };
    ////////// click to next song/////
    playList.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest("option")) {
        if (songNode) {
          _this.currentIndex = songNode.dataset.index;
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }
      }
    };
  },
  loadCurrentSong() {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
    audio.src = this.currentSong.path;
  },
  nextSong() {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
    this.render();
    this.scrollToActiveSong();
  },
  preSong() {
    this.currentIndex--;
    if (this.currentIndex <= 0) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
    this.render();
    this.scrollToActiveSong();
  },
  playRandomSong() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex == this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
    this.render();
    this.scrollToActiveSong();
  },
  scrollToActiveSong() {
    setTimeout(() => {
      if (app.currentIndex <= 2) {
        $(".song.active").scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        $(".song.active").scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 500);
  },
  start() {
    this.defineProperties();
    this.handleEvent();
    this.loadCurrentSong();
    this.render();
    this.scrollToActiveSong();
  },
};
app.start();
// console.log("hellooooo")
