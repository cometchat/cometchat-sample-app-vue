import propertyCheck from "./property-check";

export default {
  mixins: [propertyCheck],
  methods: {
    async setImage() {
      if (this.hasProperty(this.parsedMessage, "metadata")) {
        const metadata = this.parsedMessage.metadata;
        const injectedObject = metadata["@injected"];
        if (injectedObject && this.hasProperty(injectedObject, "extensions")) {
          const extensionsObject = injectedObject["extensions"];
          if (
            extensionsObject &&
            this.hasProperty(extensionsObject, "thumbnail-generation")
          ) {
            const thumbnailGenerationObject =
              extensionsObject["thumbnail-generation"];

            const imageToDownload = this.chooseImage(thumbnailGenerationObject);

            try {
              const response = await this.downloadImage(imageToDownload);
              const url = URL.createObjectURL(response);
              let img = new Image();
              img.src = url;
              img.onload = () => (this.imageUrl = img.src);
            } catch (error) {
              console.error(error);
            }
          }
        }
      } else {
        let img = new Image();
        img.src = this.parsedMessage.data.url;
        img.onload = () => (this.imageUrl = img.src);
      }
    },
    downloadImage(imgUrl) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", imgUrl, true);
        xhr.responseType = "blob";

        xhr.onload = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              this.timer = null;
              resolve(xhr.response);
            } else if (xhr.status === 403) {
              this.timer = setTimeout(() => {
                this.downloadImage(imgUrl)
                  .then((response) => resolve(response))
                  .catch((error) => reject(error));
              }, 800);
            }
          } else {
            reject(xhr.statusText);
          }
        };

        xhr.onerror = (event) =>
          reject(new Error("There was a network error.", event));
        xhr.ontimeout = (event) =>
          reject(new Error("There was a timeout error.", event));
        xhr.send();
      });
    },
    chooseImage(thumbnailGenerationObject) {
      const smallUrl = thumbnailGenerationObject["url_small"];
      const mediumUrl = thumbnailGenerationObject["url_medium"];

      let imageToDownload = mediumUrl;

      if (this.windowWidth < 950) {
        imageToDownload = smallUrl;
      }

      return imageToDownload;
    },
    onResize() {
      this.windowWidth = window.innerWidth;
      this.setImage();
    },
  },
};
