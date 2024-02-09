# Sendcloud's Front-end Development Assignment

## Introduction

This repository contains my (Steve Zeeuwe) process and final solution of an assignment send by Sendcloud for the role of (senior) Front-End Developer. The goal of this assignment is to provide insight into my way of working and technical skill level.

For that reason I decided to create an additional document; the so called [process document](PROCESS.md) which explains my process.

The rest of this README is in service of the assignment; an explanation, how to run the project and so on.

## The assignment

The assignment is to turn a [provided design](/designs/landing-example.png) of a landing page into code by using HTML, CSS and Javascript. The landing page also includes a [functional battery range calculator](/designs/reactivity-example.gif). At the end of the README you can find the list of requirements. For convenience I shortened some of the points and turned them into a checklist so I can keep track of their status.

## Online demo

For convenience I will upload the final solution to my own website. Technically my own website is not Netlify or Vercel, but I assume it has the same effect and my personal website is cooler anyway.

## Running locally

If you want to run the final solution locally follow the steps below;

-   `git clone `

## List of requirements

### Functionals

-   [ ] Clicking on the arrow-down icon in the first hero section should point the user to the
        battery range calculator
-   [ ] Implement a battery range calculator for two types of the Tesla Model S that
        displays the maximum distance covered by each type of car, based on the user
        choices for speed, temperature (with and without heating/cooling), and wheel size.
        It should have the following controls
    -   [ ] A range of speeds from `70` to `140` km/h using steps of `10km`;
    -   [ ] A range of temperatures from `-10º` to `40º` using steps of `10º`
    -   [ ] A toggle for air conditioner/heating system. The temperature should affect how this component
            is displayed
    -   [ ] A wheel size selection with `19"` and `21"`.
-   [ ] Use the JSON files from the `data/` directory to build the calculator behavior

### Non-functionals

-   [ ] The project must be written in HTML, JavaScript and CSS, _without using any other
        library or framework_
-   [ ] Make the design responsive;
-   [ ] It must be compatible with modern browsers, but also include IE11 and non-Chromium Edge.
-   [ ] Include a `README.md` file with instructions of how to run your final project.
-   [ ] It must provide a usable version of the project whenever _JavaScript is disabled_.
-   [ ] Make sure that the project is SEO-friendly by using proper HTML semantics.
-   [ ] All resources must be optimized for content delivery

#### Bonus points

-   [ ] Use animations to make the interactions with the UI more fluid.
-   [ ] Make your project fully responsive without sacrificing either usability _or_ accessibility
-   [ ] Keep an eye on performance and apply optimizations as much as you can.
-   [ ] Deploy it as a static website on [Netlify](https://netlify.com) or [Vercel](https://vercel.com)
-   [ ] Make sure your project is [well-tested](https://martinfowler.com/articles/practical-test-pyramid.html)
