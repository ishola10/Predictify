<template>
  <div class="welcome-page">
    <div class="content">
      <div
        class="banner"
        :style="{ backgroundImage: 'url(' + currentBackground + ')' }"
      >
        <div class="banner-content">
          <div>
            <h1>Welcome to <span class="site-name">Predictify</span>!</h1>
            <p>
              Your one-stop destination for predictive insights and analytics.
            </p>
            <button @click="getStarted" class="get-started-button">
              Get Started
            </button>
            <button @click="signIn" class="sign-in-button">Sign In</button>
          </div>
          <div class="banner-image">
            <img src="../assets/pngwing.com (4).png" alt="" />
          </div>
        </div>
      </div>

      <div class="philosophy">
        <div class="philosophy-content">
          <h2>Our Philosophy</h2>
          <p>
            At Predictify, we believe in the power of predictions. Our platform
            empowers users to make informed decisions and forecast future
            outcomes with confidence.
          </p>
        </div>
        <div class="philosophy-video">
          <video width="100%" controls>
            <source :src="Vid" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div class="feature">
        <h2>Features</h2>
        <p>Explore a whole lot of Features</p>
        <div class="features-container">
          <div
            class="feature-box"
            v-for="feature in features"
            :key="feature.title"
          >
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <div class="blog-section">
        <h2>Latest Articles</h2>
        <div class="blog-posts">
          <div class="blog-post" v-for="post in blogPosts" :key="post.id">
            <img :src="post.imageUrl" :alt="post.title" />
            <div class="blog-post-info">
              <h3>{{ post.title }}</h3>
              <p>{{ post.excerpt }}</p>
              <router-link :to="'/blog/' + post.id" class="read-more"
                >Read more</router-link
              >
              <button @click="likePost(post)" class="like-button">
                <i
                  :class="[post.liked ? 'fas fa-heart liked' : 'far fa-heart']"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="testimonials">
        <h2>Testimonials</h2>
        <div class="testimonial-container">
          <div
            class="testimonial"
            v-for="testimonial in testimonials"
            :key="testimonial.author"
          >
            <div class="testimonial-info">
              <img :src="testimonial.imageUrl" :alt="testimonial.author" />
              <div class="quote-info">
                <p class="quote">{{ testimonial.quote }}</p>
                <p class="author">- {{ testimonial.author }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="stay-connected">
        <div>
          <h2>Stay Connected</h2>
          <p>Follow us on social media for the latest updates and news.</p>
        </div>
      </div>

      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import Footer from "./Footer.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import Image7 from "../assets/Image (7).png";
import Image8 from "../assets/Image (8).png";
import Feets from "../assets/images/Something I did with my soccer team!!!.jpeg";
import Rugby from "../assets/images/My Site – Just another WordPress site.jpeg";
import Golf from "../assets/images/golf.jpeg";
import Pitch from "../assets/images/pitch.jpg";
import Ds from "../assets/images/ds.jpg";
import Vid from "../assets/videos/vid.mp4";

const backgrounds = [Pitch, Ds];
const currentBackground = ref<string>(Pitch);

onMounted(() => {
  setInterval(changeBackground, 5000);
});

function changeBackground() {
  const currentIndex = backgrounds.indexOf(currentBackground.value);
  const nextIndex = (currentIndex + 1) % backgrounds.length;
  currentBackground.value = backgrounds[nextIndex];
}

interface Feature {
  title: string;
  description: string;
}

interface Testimonial {
  imageUrl: string;
  quote: string;
  author: string;
}

interface BlogPost {
  id: number;
  title: string;
  imageUrl: string;
  excerpt: string;
  liked: boolean;
}

const router = useRouter();

const getStarted = () => {
  router.push("/signup");
};
const signIn = () => {
  router.push("/login");
};

const features: Feature[] = [
  {
    title: "Predict",
    description:
      "Make predictions on a variety of topics and trends. Use our powerful prediction tools to get insights and forecast future outcomes.",
  },
  {
    title: "Save Prediction",
    description:
      "Save your predictions to review later. Track your predictions over time and see how they align with actual outcomes.",
  },
  {
    title: "History",
    description:
      "View your prediction history to analyze your performance. Monitor your prediction accuracy and identify areas for improvement.",
  },
  {
    title: "Stats",
    description:
      "Analyze your overall prediction stats, including success rate and prediction frequency. Use the data to enhance your skills.",
  },
  {
    title: "User Details",
    description:
      "Manage your profile information, including your account settings and preferences. Customize your experience on Predictify.",
  },
];

const testimonials: Testimonial[] = [
  {
    imageUrl: Image7,
    quote:
      "Predictify helped me make accurate predictions on market trends. Highly recommended!",
    author: "John Doe",
  },
  {
    imageUrl: Image8,
    quote:
      "The user-friendly interface and powerful tools make Predictify my go-to platform for predictions.",
    author: "Jane Smith",
  },
];

const blogPosts = ref<BlogPost[]>([
  {
    id: 1,
    title: "10 Tips for Successful Predictions",
    imageUrl: Feets,
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor augue velit, at mollis lorem suscipit vel.",
    liked: false,
  },
  {
    id: 2,
    title: "The Future of Predictive Analytics",
    imageUrl: Rugby,
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor augue velit, at mollis lorem suscipit vel.",
    liked: false,
  },
  {
    id: 3,
    title: "Predicting Sports Outcomes with Machine Learning",
    imageUrl: Golf,
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor augue velit, at mollis lorem suscipit vel.",
    liked: false,
  },
]);

const likePost = (post: BlogPost) => {
  post.liked = !post.liked;
};
</script>

<style>
.welcome-page {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background);
  margin: 0;
  padding: 0;
  width: 100%;
}

.content {
  text-align: center;
  color: white;
}

.banner {
  /* background-image: url("../assets/images/pitch.jpg"); */
  background-size: cover;
  background-position: center;
  text-align: left;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  transition: background-image 0.5s ease-in-out;
}

.banner-content {
  padding: 15% 0 11.5% 7%;
  background-color: rgba(5, 4, 4, 0.5);
  display: flex;
  align-items: center;
  gap: 4rem;
}

.banner-image img {
  width: 150px;
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.banner h1 {
  font-size: 4rem;
  margin-bottom: 20px;
  color: var(--color-background);
}
.site-name {
  color: var(--color-accent);
}

.banner p {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.get-started-button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: var(--color-text);
  color: white;
  cursor: pointer;
  font-weight: bold;
  margin-right: 3%;
}

.get-started-button:hover {
  background-color: var(--color-accent);
}

.sign-in-button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: transparent;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border: 2px solid var(--color-text);
}

.sign-in-button:hover {
  background-color: var(--color-accent);
  color: var(--color-secondary);
}

.philosophy {
  display: flex;
  justify-content: space-between;
  padding: 40px 0;
  max-width: 1000px;
  margin: 0 auto;
}

.philosophy-content {
  max-width: 50%;
  text-align: left;
}

.philosophy h2 {
  font-size: 3rem;
  margin-bottom: 10px;
  color: var(--color-accent);
}

.philosophy p {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--color-primary);
}

.philosophy-video {
  max-width: 50%;
}

.feature {
  padding: 20px 0px;
  text-align: left;
  border-top: 1px solid var(--color-accent);
}

.feature h2 {
  font-size: 3rem;
  margin-bottom: 10px;
  margin-left: 4%;
  color: var(--color-text);
}

.feature p {
  font-size: 1.5rem;
  margin-bottom: 20px;
  margin-left: 4%;
  color: var(--color-accent);
}

.features-container {
  display: grid;
  max-width: 80%;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px 0;
  margin: 0 auto;
}

.feature-box {
  padding: 15px;
  border-radius: 5px;
  background-color: var(--color-secondary);
  color: white;
  text-align: left;
}

.feature-box h3 {
  color: var(--color-accent);
  margin-bottom: 10px;
}

.feature-box p {
  color: var(--color-background);
  font-size: 1.2rem;
}

.testimonials {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  border-top: 1px solid var(--color-accent);
}

.testimonials h2 {
  font-size: 3rem;
  margin-bottom: 10px;
  color: var(--color-accent);
  text-align: center;
}

.testimonial-container {
  padding: 40px 0;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 3rem;
}

.testimonial {
  background-color: var(--color-accent);
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}

.testimonial .testimonial-info {
  display: flex;
  align-items: center;
}

.testimonial img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.testimonial .quote-info {
  flex: 1;
}

.testimonial .quote {
  font-size: 1.2rem;
  color: var(--color-background);
  margin-bottom: 10px;
}

.testimonial .author {
  font-size: 1rem;
  color: var(--color-secondary);
  margin-top: 10px;
}

.blog-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 0;
  border-top: 1px solid var(--color-accent);
}

.blog-section h2 {
  font-size: 3rem;
  margin-bottom: 20px;
  color: var(--color-accent);
  text-align: center;
}

.blog-posts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.blog-post {
  background-color: var(--color-background);
  border-radius: 10px;
  padding: 20px;
}

.blog-post img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
}

.blog-post h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: var(--color-secondary);
}

.blog-post p {
  color: var(--color-secondary);
}

.read-more {
  color: var(--color-accent);
  text-decoration: underline;
  cursor: pointer;
}

.like-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.like-button i {
  color: #ccc;
  font-size: 24px;
}

.like-button i.liked {
  color: var(--color-accent);
}

.stay-connected {
  background-color: var(--color-secondary);
  color: white;
  padding: 40px 0;
  text-align: center;
}

.stay-connected h2 {
  font-size: 3rem;
  margin-bottom: 10px;
  color: var(--color-background);
}

.stay-connected p {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--color-background);
}




@media screen and (max-width: 767px) {
  .banner-content {
    padding: 50% 5%;
  }

  .banner h1 {
    font-size: 2rem;
  }

  .banner p {
    font-size: 1rem;
  }

  .banner-image img {
    width: 100px;
  }

  .sign-in-button{
    margin-top: 5%;
  }

  .philosophy{
    flex-direction: column;
    padding: 0 10%;
  }
  .philosophy-content,
  .philosophy-video {
    max-width: 100%;
  }

  .features-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .testimonial-container {
    flex-direction: column;
    padding: 0 7%;
  }

  .testimonial {
    width: 100%;
  
  }

  .blog-posts {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

</style>
