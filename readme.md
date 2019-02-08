# HTML Website Placeholder

This is small placeholder site which encorporates images from [Unsplash](https://unsplash.com/?utm_source=html-placeholder&utm_medium=referral) and quotes from [Favqs](https://favqs.com) and displays them full screen.

## Getting Started

First, clone the repository to your machine. Then you will need to configure the Unsplash API with an app key.

Before using the Unsplash API, you need to [register as a developer](https://unsplash.com/developers) and read the [API Guidelines](https://medium.com/unsplash/unsplash-api-guidelines-28e0216e6daa).

Once you have registered, rename the `.env.exaple` file to `.env` and replace the `APP_ID_GOES_HERE` text with your Unsplash 'Access Key'. Your 'Secret Key' is not required.

Then, to get the page up and running, call:

```
$ yarn
$ yarn run build
```

The site will then be built and a `dist` directory created for it. Simply point your web server to this directory and your site will be served.

### Development

Should you wish to test the site locally or make changes to the setup, then you can also run

```
$ yarn
$ yarn run dev
```

This will launch a live reloading server at http://localhost:8080 and launch your browser for you to test any changes you make.
