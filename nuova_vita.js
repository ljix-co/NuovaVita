Vue.component("gallery", {
  props: ["images"],
  data: function () {
    return {
      featuredImage: "./images/" + this.images[1].large
    }
  },
  template: `
  <div class="gallery">
  <div class="featured-img">
  <img class="main-image" :src="featuredImage"/>
  </div>
  <div class="thumb-img">
  <img class="thumb-image" v-for="image in images" :src="thumbImage(image)" @click="changeFeaturedImage(image)"/>
  </div>
  </div>
  
  `,
  methods: {
    thumbImage: function (image) {
      return "./images/" + image.thumb;
    },
    changeFeaturedImage(image) {
      this.featuredImage = "./images/" + image.large;
    }
  }
});
Vue.component("sub-gallery", {
  props: ["images"],
  template: `
  <div class="sub-gallery">
  <img class="sub-image" v-for="image in images" :src="Image(image)"/>
  </div>
  `,
  methods: {
    Image: function (image) {
      return "./images/" + image.large;
    }
  }
});
Vue.component("intro", {
  props: ["data"],
  template: `
  <div class="intro">
  <div id="intro_text"  v-html="data.text"></div>
  <gallery :images="data.images"></gallery>
  </div>
  `
})
Vue.component("projects", {
  props: ["data"],
  template: `
<div class="projects">
<h3>Projects - our selection</h3>
<div class="project-furnt">
<div class="project-furnt-txt" v-html="data.text"></div>
<gallery :images="data.images"></gallery>
</div>
</div>
  `
});
Vue.component("project", {
  props: ["data"],
  template: `
<div class="product-div">
<h3>{{data.title}}</h3>
<div class="product">
<div class="product-txt" v-html="data.sub_text">
{{data.sub_text}}
</div>
<div class="project-sub-gallery">
<sub-gallery :images="data.sub_images"></sub-gallery>
</div>
</div>
</div>
`
});
Vue.component("furnishings", {
  props: ["data"],
  template: `
<div class="furniture" >
<h3>Furniture - our selection</h3>
<div class="project-furnt">
<div class="project-furnt-txt" v-html="data.text"></div>
<gallery :images="data.images"></gallery>
</div>
</div>
  `
});
Vue.component("furniture", {
  props: ["data"],
  data: function () {
    return {
      hiddenLink: "",
      enlarged: ""
    }
  },
  template: `
<div class="product-div">
<h3>{{data.title}}</h3>
<div class="product">
<div  class="product-txt" v-html="data.sub_text">
{{data.sub_text}}
</div>
<div class="info-product">
<div class="div-info-product" v-for="image in data.sub_images">
<div class="btns">
<button @click="buyProduct(image)" class="furnt-btn"><i class="fas fa-cart-plus"></i></button>
<button @click="hiddenLink = image" class="furnt-btn"><i class="fas fa-info"></i></button>
<div class="details-product" v-show="hiddenLink == image">
<button @click="hiddenLink = ''" class="furnt-btn"><i class="fas fa-times"></i></button>
<p class="product-title">{{image.title}}</p>
<div  class='list-details' v-html="image.details"></div>
<p class="product-price">Price: {{image.price}} $</p>
</div>
</div>
<div class="info-product-image">
<div class="enlarged" v-show="enlarged == image">
<button @click="enlarged=''"><i class="fas fa-times"></i></button>
<img class="main-image" :src="enlargedImage(image)"/>
</div>
<a href="#" @click="enlarged = image"><img class="sub-image" :src="Image(image)"/></a>
</div>
</div>
</div>
</div>
</div>
  `,

  methods: {
    Image: function (image) {
      return "./images/" + image.large;
    },
    buyProduct: function (image) {
      this.$emit("buy-product", image);
    },
    enlargedImage: function (image) {
      return "./images/" + image.large;
    }
  }
});
Vue.component("about", {
  props: ["data"],
  data: function () {
    return {
      currentIndex: 0,
      index: 0
    }
  },
  template: `
<div class="about_co">
<div class="about">
<img class="main-image" src="./images/company.jpg"/>
<div class="about_txt" v-html="data.text">
{{data.text}}
</div>
</div>
<div>
<div class="about-org">
<div v-for="image in data.subcategories[currentIndex].sub_images">
<img :src="Image(image)" class="main-image"/>
</div>
<div>
<div class="about_txt" v-html="data.subcategories[currentIndex].sub_text"></div>
<button @click="changeIndex(currentIndex)"><i class="far fa-arrow-alt-circle-right"></i></button>
</div>
</div>
</div>
</div>
  `,
  methods: {
    changeIndex(currentIndex) {

      if (currentIndex == this.data.subcategories.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
      return this.currentIndex;
    },
    Image(image) {
      return "./images/" + image.large;
    }
  }
});
Vue.component("shopping-cart", {
  props: ["shopping_cart"],
  template: `
<div>
<p class="total_price">Total price: {{totalPrice}} $</p>
<ul v-for="product in shopping_cart">
<li> {{product.title}}, price: {{product.price}} <button @click="deleteProduct(product)" class="delete-btn"><i class="fas fa-times"></i></button></li>
</ul>
</div>
  `,
  computed: {
    totalPrice: function () {
      let totalprice = 0;
      for (let product of this.shopping_cart) {
        totalprice += product.price;
      }
      return totalprice;
    }
  },
  methods: {
    deleteProduct: function (product) {
      this.$emit("delete-product", product);
    }
  }
});
Vue.component("results", {
  props: ["searched_data"],
  data: function () {
    return {
      hiddenLink: ""
    }
  },
  template: `
  <div class="result" >
  <div v-for="result in searched_data">
  <div>
  <img class="result_img" :src="Image(result)"/>
  </div>
  <div class="result_btns">
  <button @click="buyProductResult(result)" class="result-btn"><i class="fas fa-cart-plus"></i></button>
  <button @click="hiddenLink = result" class="result-btn"><i class="fas fa-info"></i></button>
  <div class="details-product" v-show="hiddenLink == result">
  <button @click="hiddenLink = ''" class="furnt-btn"><i class="fas fa-times"></i></button>
  <p>{{result.title}}</p>
  <div class="result-details" v-html="result.details"></div>
  <p>Price: {{result.price}} $</p>
  </div>
  </div>
  </div>
  </div>
   `,
  methods: {
    Image: function (result) {
      return "./images/" + result.image;
    },
    buyProductResult: function (result) {
      this.$emit("buy-product", result);

    }
  }
})
const app = new Vue({
  el: "#app",
  data: {
    data: [],
    page: "",
    links: "",
    nav: "",
    shoppingCart: false,
    shopping_cart: [],
    searchField: false,
    category: document.querySelector("#inptCategory").value,
    priceFrom: Number(document.querySelector(".inptPriceFrom").value),
    priceTo: Number(document.querySelector(".inptPriceTo").value),
    searched_data: [],
    result: false
  },
  computed: {

  },
  methods: {
    buyProduct: function (image) {
      for (let data of this.data) {
        if (data.category == "furniture") {
          for (let s in data.subcategories) {
            for (let i in data.subcategories[s].sub_images) {
              if (image == data.subcategories[s].sub_images[i]) {
                this.shopping_cart.push({
                  image: data.subcategories[s].sub_images[i].large,
                  price: data.subcategories[s].sub_images[i].price,
                  title: data.subcategories[s].sub_images[i].title
                });
              }
            }
          }
        }
      }
      return;
    },
    buyProductResult: function (result) {
      for (let data of this.searched_data) {
        if (result == data) {
          this.shopping_cart.push({
            image: data.image,
            price: data.price,
            title: data.title

          });
        }
      }
      return;
    },
    search: function ([category, priceFrom, priceTo]) {
      this.result = true;
      this.searched_data = [];
      for (let data of this.data) {
        if (data.category == "furniture") {
          for (let subcategory of data.subcategories) {
            if (subcategory.title == category) {
              for (let i in subcategory.sub_images) {
                if (subcategory.sub_images[i].price >= priceFrom && subcategory.sub_images[i].price <= priceTo) {
                  this.searched_data.push({
                    image: subcategory.sub_images[i].large,
                    title: subcategory.sub_images[i].title,
                    price: subcategory.sub_images[i].price,
                    details: subcategory.sub_images[i].details
                  });
                }
              }
            }
          }
        }
      }
      return;
    },
    deleteProduct: function (product) {
      for (let i in this.shopping_cart) {
        if (this.shopping_cart[i].title == product.title) {
          this.shopping_cart.splice(i, 1);
        }
      }
    }
  }
});
axios({
  method: "get",
  url: "./data.json"

}).then(function (response) {

  app.data = response.data;
});
