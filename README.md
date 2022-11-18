# Data fetching from an external API using Next.js

![alt text](https://ik.imagekit.io/zwcfsadeijm/screenshot-rocks__5__KlUg9CFHM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668776892231)

## The what and how
- fetches random user data from [random-data-api](https://random-data-api.com/api/users/random_user?size=10)
- displays it in a tabluar form
- uses tailwind for the ui
- data is fetched client side using getStaticProps so site functions as a static site
- a unified search bar to search through different fields
- data is paginated
- uses a custom api that gives an object which contains details of the Supermind team
- no external libraries were harmed in the making of this project

## How to set up and run the project?

### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```
  
### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/rittikbasu/next-datafetch.git
   ```
2. cd in to the directory
   ```sh
   cd next-datafetch
   ```
3. Install the required packages
   ```sh
   npm install
   ```
4. Run the project on your localhost
   ```sh
   npm run dev
   ```
