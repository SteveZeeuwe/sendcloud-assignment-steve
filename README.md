# Sendcloud's Front-end Development Assignment

## Introduction

This repository contains my (Steve Zeeuwe) process and solution of an assignment sent by Sendcloud for the role of (senior) Front-End Developer. The goal of this assignment is to provide insight into my way of working and technical skill level.

For that reason I decided to create the [process document](PROCESS.md) which details my process.

The rest of this README is in service of the assignment; an explanation, how to run the project, and so on.

## The assignment

The assignment is to turn a [provided design](/workfiles/designs/landing-example.png) of a landing page into code by using HTML, CSS and Javascript. The landing page also includes a [functional battery range calculator](/workfiles/designs/reactivity-example.gif). At the end of the README you can find the list of requirements. For convenience I shortened some of the points and turned them into a checklist so we can keep track of their status.

## Online demo

The project is hosted on [my personal website](https://stevezeeuwe.com/sendcloud). Technically my own website is not Netlify or Vercel, but I assume it has the same effect and my personal website is cooler anyway.

## Running locally

Requirements: you have GIT, Node.js and npm installed. You have an active internet connection.

If you want to run the project locally, follow these steps;

-   Clone the project: `git clone git@github.com:SteveZeeuwe/sendcloud-assignment-steve.git`
-   From the root of the project, run `npm install`
-   From the root of the project, run `npm run dev`
-   This starts a local webserver, see the terminal for the address

## Developing

If you want to develop the project you simply run `npm run dev` to see your changes.

When you are ready to release your changes, follow these steps;

-   Run 'npm run build'
-   This empties the dist folder and puts the newly build files there. Use these files to host the application at your desired location.

### Troubelshooting

-   If your local webserver serves the html but the styling or js is missing, delete the `.parcel-cache` folder and re-run `npx parcel index.html`

## List of requirements

### Functionals

-   [x] Clicking on the arrow-down icon in the first hero section should point the user to the
        battery range calculator
-   [x] Implement a battery range calculator for two types of the Tesla Model S that
        displays the maximum distance covered by each type of car, based on the user
        choices for speed, temperature (with and without heating/cooling), and wheel size.
        It should have the following controls
    -   [x] A range of speeds from `70` to `140` km/h using steps of `10km`;
    -   [x] A range of temperatures from `-10º` to `40º` using steps of `10º`
    -   [x] A toggle for air conditioner/heating system.
        -   [x] The temperature should affect how this component is displayed
    -   [x] A wheel size selection with `19"` and `21"`.
-   [x] Use the JSON files from the `data/` directory to build the calculator behavior

### Non-functionals

-   [x] The project must be written in HTML, JavaScript and CSS, _without using any other
        library or framework_
-   [x] Make the design responsive;
-   [x] It must be compatible with modern browsers.
    -   [ ] Also include IE11 and non-Chromium Edge. - The process document describes why this requirement is not met.
-   [x] Include a `README.md` file with instructions of how to run your final project.
-   [x] It must provide a usable version of the project whenever _JavaScript is disabled_.
-   [x] Make sure that the project is SEO-friendly by using proper HTML semantics.
-   [x] All resources must be optimized for content delivery - for the most part. Parcel does some optimization, I optimized some resources myself, loading variable font via Google Webfonts and I implemented things like srcset, just not everywhere.

#### Bonus points

-   [x] Use animations to make the interactions with the UI more fluid.
-   [x] Make your project fully responsive without sacrificing either usability _or_ accessibility
-   [x] Keep an eye on performance and apply optimizations as much as you can.
-   [x] Deploy it as a static website on [Netlify](https://netlify.com) or [Vercel](https://vercel.com) - hosting it on [my personal website](https://stevezeeuwe.com/sendcloud)
-   [ ] Make sure your project is [well-tested](https://martinfowler.com/articles/practical-test-pyramid.html) - There is no automated testing implemented, but I wrote my thoughts on it in the process document -> Next steps.
