## Step one; indexing the assignment

The first thing I do when I get an assignment is to make sure I understand what is asked and that I am able to do what is asked. In this case it was fairly straightforward; the requirements are clear enough and I made sure that I had all the files needed to build the solution.

From experience I knew it would be handy to have the XD file open so I can inspect sizes, fonts, colors and so on. Unfortunately XD has been moved into 'maintenance mode' since Adobe tried to acquire Figma. This means that Adobe has made it more difficult to download XD.. I actually had to get a subscription to be able to download XD, whereas previously it was a separate product download.

Getting the subscription took over 12 hours to come through, so this delayed my start quite a bit. I would like to suggest looking into moving away from XD for future applicants.

> Fun fact; the Adobe-Figma proposed merger has very recently come to a halt as they could not get regulatory approval, so XD's death was in vain.

## Step two; decide on the process

The goal of this project is not to have the files of a working range calculator on a landing page but rather to display my skill level and way of working. For that reason I find it important to make a conscious decision on how I'm going to work on this project and how I can best showcase the entire process; not only the final result.

I chose to use git and keep track of my (thought) process by writing this document.

The reason why I decided to use git is twofold:

1. It shows how I use git; an invaluable tool for collaborative development and version control.
2. It provides a timeline of my development as opposed to only the final result. As iterative development is important in agile environments I decided to use git to show my approach / iterations.

The reason why I decided to write this process document is also twofold:

1. This process document is easier to read than opening a bunch of commits.
2. This document allows me to also write about what I did _not_ commit; this can be just as important if you want to get a feel of my way of working.

Let's get started.

## Step three; blocking the design (~5 minutes)

When I get a design, I usually make a mental map of the rough html layout. If the design is complex I grab a piece of paper and actually 'block out' the various elements of the design. To visualize this, I opened Paint and made [this](</workfiles/progress images/landing-example-boxed.jpg>) for you guys.

-   This serves as a reference to get started, things may change during development.
-   I decided on an `<article>` for the calculator as I see the calculator as something that can be cut and pasted somewhere else as 'it makes sense on its own'.
-   I know I didn't block out everything; I think this gets the point across and the most important bits have been covered.

## Step four; initial setup (~1-1.5 hours)

The first thing code-wise is usually to do some initial setup;

-   Add index.html, css file(s), images
-   Implement a basic version of the page; this should result in something that roughly resembles the 'blocks' in the blocked-out design, but is definitely not finished yet.
-   I usually add a bit of css here and there to make it look a bit more like the design and to get a first feel of the scope of the css. This helps in deciding how I want to set up the css later.
-   Earlier I mentioned I see the range-calculator as an article, meaning I treat it as something that 'makes sense on its own'. For that reason I decided I wanted to treat this part of the project as something that can relatively easily be taken out/copied and so I did the following:
    -   Use a separate file for the range-calculator css. Perhaps later I will use a bundler to be able to have this separation, but still end up with just one optimized css file instead of having multiple requests.
    -   I decided to use css variables in this project. For keeping the range-calculator as contained as possible I decided to use the variables but also include fallback values, which might look a bit silly in this context: `color: var(--main-accent-color, #008DFF)`.
-   Regarding the range-calculator controls I decided to try and use as many native inputs as possible for the controls, and at least for the initial setup, that went pretty well. My reasoning for trying to use native implementations will be discussed in a later step when I add the reactivity part.
-   For the speed and temperature controls I used a disabled number input followed by two custom buttons for increasing/decreasing.
    -   By utilizing as many native properties as possible (min, max, step, disabled), all I had to do was call the `stepDown(1)` or `stepUp(1)` function on the correct input, and voila, the numbers can be controlled as per the requirements.
-   Toggling the AC was easy; true/false inputs are done with checkboxes. A custom checkbox is achievable by hiding the actual checkbox and manipulating the label with css, most importantly the `:checked` pseudo-selector.
-   The wheels were also straightforward; selecting one from multiple mutually exclusive options is done with radio buttons. The custom styling is done the same way as for the custom checkboxes.

Add this point I also realized I can make a developers version of the XD file, which is hugely beneficial for inspecting purposes. It creates a publicly available url, you can have a look [here](https://xd.adobe.com/view/2150d485-b5e6-4a45-8729-6c0636678961-7403/specs/). Small things like this make me so happy when developing!

## Step five; the range-calculator - naive implementation (~1-1.5 hours)

After step 4 I now have a rough version of the page and some functionality, [see screenshot](/workfiles/progress%20images/step-4-completed.png). This means that now I will focus on the following two things by working iteratively;

-   Finalizing the design including responsiveness and animations
-   Finalizing the range-calculator functionality.

I will most likely work on the styling part here and there during this step as I like to alternate between different kinds of jobs, but the focus of this step will be the range-calculator.

As this part is the most technically challenging, I will keep track of my overall thought process and findings;

-   I have four inputs. If any of the input's values is changed, I need to determine a range for all model-s types (100D & P100D) based on data in a JSON and then update the DOM accordingly.

    -   I will first make sure I have access to the data. Since I have not read any limitation on how I get access to the data, I assume I can simply hard-code it as a JSON object within my application. This makes the whole setup easier; I will not need to run a local webserver to be able to fetch the files.
    -   I do not know whether I am allowed to alter the structure of the data, so at least initially I won't.
    -   Ever since I saw the project I had this funky idea of transforming the data into an object where I can simply get the range by accessing an object like so: `data_100d[temperature][wheelsize][ac][kmh]`. I think this results in a smaller JSON object and it should be really fast.
    -   Initially I will simply implement a .find() on the data array and try to find a match. If later I have time left I will also try the funky way by transforming the data. I am curious how difficult it is and what the performance difference will be.
    -   I want to set everything up in such a way that it is easy to add or remove a model, let's see if I can do that within a reasonable amount of time.

The first iteration is done and I'm happy with how the reactivity works as it uses as many native implementations as possible. The only inputs that require a bit more work are the number inputs as I could not style the native up/down buttons. Instead I hide the native buttons by disabling the input and then I implement custom buttons. These buttons use native functions to increase the input's value by the `step` value: `stepUp()` and `stepDown()`.

I was hoping this would internally trigger an event, for example `change`, but sadly it doesn't. This means I had to manually create an event and fire it. I chose to use the `change` event as this event is used for the other types of input.

At this point I'm not that happy with the code structure yet for various reasons. I will improve that in the next iteration by turning the range-calculator into a class. This has the benefits of encapsulation and scope management; grouping related variables and functions together improves organization and readability, and on top of that reduces the pollution of the global scope. I swear I'm writing everything myself and not using ChatGPT for it :').

## Step six; the range-calculator - class-based (~0.5 hours)

While turning the range-calculator into a class I also decided to go for pure functions. This usually makes it easier for me to see the flow of the code and gives me some handholds on how to structure the code. I did not go for a 100% implementation time-wise, I might look into it more later.

I also improved some of the checks to make the code more defensive, altho it's quite difficult to know how far to go with this in a hypothetical project.

At this point I'm relatively happy with how the code is structured and how it performs. I tried to set it up quite dynamically; in such a way that it's easy to add/change inputs, car types and datasets. Of course the code is still very much coupled to a specific HTML implementation. I did consider building the `.ranges` and `.controls` with javascript. That would have the benefit of not needing to update the html manually as the constructor parameters change, but thought that went a bit far for this assignment.

## Step seven; implement XD design. (~2.5 hours)

Next up I wanted to implement the XD design. First the desktop version and then touch up for other screen sizes with media queries.

I quickly felt the need for more structured and readable css, so I opted for implementing SCSS. During this I noticed that the file/folder structure was becoming a bit of a mess so decided to do a cleanup. An assets folder for project assets, workfiles folder for everything related to source materials and process stuff. I did decide to keep `PROCESS.MD` in the root to make the chance anyone misses it as small as possible.

The file/folder structure cleanup and some npm fiddling later I had a nice clean folder structure and scss up and running. Time to style this page.

-   First step to more structured and readable css was to split into multiple files. I decided to go for a basic implementation of the 7-1 pattern.
-   Chose to inline the SVG for easy color-changes via CSS for the hover effect.
-   I usually try to only use margin-bottom and margin-right for specific spacing as it makes it easier to debug layout issues.
-   Added wheels. Used %-based absolute positioning within the container to make sure wheels stay in place on all resolutions.
-   Added wheel rotation animation. Might make the speed depend on input speed later.
-   Updated most images to use srcset for responsive image optimization.
-   Found the font on google webfonts, loading via URL. Seemed way more performant than loading the local files. Also a chance the user already has the font downloaded from a different website.
-   I am very much used to sticking to a certain grid of values for things like spacing. The different spacing values used in the XD drove me crazy, and here and there I decided to alter them slightly to be a bit more consistent.
-   The amount of different colors and fonts was also surprising but ultimately I decided to not change those. Definitely a point of feedback for the XD designer tho - do we really need so many different colors / spacing / font-sizes / line-heights? The footer is a good example of a whole bunch of different styles used close to each other. In the end it is up to the (UX)designer of course, but I would definitely feel responsible as a front-end developer to talk about this - in a constructive manner of course.
-   Implementing the html/css for the controls was a tedious job.

## Step eight; responsive touch-up. (~1.5 hours)

The XD design is implemented for 99%. Some details are a bit off, but that's for later if there is time left. Now I want to go to the browser, start resizing, and improve things with media queries.

Generally speaking there are two ways to implement media queries; either 'inline' inside existing selectors, or create separate larger mediaqueries in which you handle all of the needed styling. For this project I decided to do it 'inline' as I expect there to not be that much anyway. I will create a small mixin to make things easier and more consistent tho.

-   The design was desktop, so I implemented the desktop version first. I don't want to rewrite a lot, so I'm opting to not go for 'mobile-first'.
-   Usually I use relative line-heights like for example `line-height: 1.2;`. Then all I have to do for different screensizes is altering the font-size; handy. Earlier I just took all values from the XD, I might update the line-heights to relative values if I have time left.

## Step nine; ticking off the requirements. (~5 hours)

-   At this point I realize I missed something in the calculator; The temperature should affect how the air conditioner/heating system component is displayed. This introduces something new and my solution does not yet cater for it; intended side-effects on input B when input A has changed.

    I now need to make a decision; will I implement this in a dynamic and simple-to-configure way, or will I more or less 'hardcode' it? Time-wise I am kind of running out. It is Thursday afternoon and I want to deliver tonight. I decided to take 15 minutes to see whether I can update the class so it allows for these kinds of side effects.

    I managed to implement something that works and is quite flexible, but at the same time feels a bit barbaric. The inputconfiguration that is provided to the constructor now has the option to add `sideEffectEvents`. These side effect events exist of a `listenFor` (string) property and a `sideEffectHandler` (function) property.

    Using these two properties the `setSideEffectEventListeners()` function sets events listeners that listen to the `listenFor` event and then executes `sideEffectHandler()`.

    After an input value has changed we call `updateBatteryRanges()` and then fire a custom event. It is these custom events that the sideEffectHandler should be listening for.

    All in all it works using simple javascript events and it's quite easy to change the behavior via the input configuration in the constructor.

-   To not have to manually fiddle around with browser compatibility too much I added postcss (using browserslist) to my dev/build commands.
-   Testing in IE11 has become increasingly difficult over time. I do not want to run a local web server to allow an online tool to access my localhost, so instead I will test IE11 at the end when I upload the project to my personal website.

    Browserstack has become very unfriendly in their free trial! I can only look at IE11 for 15 seconds at a time, once per account. This makes it quite difficult to debug issues. I could see that the calculator does not work, most likely some javascript issue. I will first implement a transpiler that should take care of IE11 support and try again, hoping that fixes it.

    I decided to use a bundler that I had not used before; Parcel. I heard it is a good zero-config bundler, and that is more or less exactly what I was looking for. It took me about 2 hours but.. I got Parcel to work. It also took over scss and postcss compiling, so I got rid of the old scripts and npm packages.

    Additionally it now also transpiles, minifies and uglifies the js code. Hoping this would fix the issues in IE11, I made my third account on browserstack to see if it fixed it. Unfortunately it did not, but I was still unable to open the console on time to see any usefull information.

    At this point I decided to spend no more time on IE11. I understand it is a requirement and with the right tools I can defintitely debug any issue / set up the transpiler in a better way, but for this project it's simply not worth spending more time on it.

-   Disabling Javascript only has functional limitations; the design remains exactly the same and most inputs even remain interactable. To make it extra clear for the user I have added a notification bar at the bottom of the screen to indicate that they need javascript in order to use the tool.
-   I ran Prettier to format all files.
-   I put my dedicated QA team (girlfriend) to work to test the website. For transparency I will share all her findings and what I did with them here;
    -   Some grammar stuff. Went through all of them and fixed where needed.
    -   When quickly using the number inputs on a touch-device might trigger double-tap which makes the user zoom in. This can be resolved by `preventDefault` on certain events on the specific elements. I put it on the next steps list as I don't have time anymore to fix it.

That's it. Time's up! I will write a little bit more about what I would do if I had more time, and also some final thoughts.

## Next steps

What I would have done if I had a bit more time;

-   There are a few known smaller issues that I did not get around to finishing. Some small stuff like alt / title attributes, more complete and advanced scrsets, the AC button should have some text in it, the number controls could be a bit smaller on mobile. I am aware of these finishing touches, but I simply had to make a cut due to time.
-   Now that I have implemented Parcel I have a local webserver running after all.. so I could have implemented fetch requests with proper error handling and such.
-   Tie the speed of wheel rotation to the vehicle speed.
-   Tie the size of the wheel images to the chosen wheel size.
-   The lists in the footer are most likely suposed to be links, but I did not implement them as such. If I would, I would take note of properly implementing `mailto` & `tel:`.
-   Turn line-heights into relative values.
-   Surely there is superfluous styling that slipped through while building this project. Another passthrough to look for this specifically could clean up the code.
-   Automated tests. Unit tests for the RangeCalculator and maybe a nice little Cypress end-to-end test as I am in love with Cypress.
-   As mentioned before I wanted to see if transforming the data into a layered object would work and what the performance difference would be. As I am fairly sure the difference would be negligible, I left this for later as a nice-to-have.
-   Fix users accidentally zooming in while quickly using number input.

## Final thoughts

-   The most difficult part of the assignment was to try and be as transparent as possible during the process, while also not overloading you guys with a lot of useless information. This comment will bite me in the ass if it turns out my implementation is terrible, but so be it!
-   Another difficult thing was how hypothetical the assignment was. It made it difficult to know when enough was enough. How defensive should the code be. How dynamic should the code be. How easily extensible should it be. I tried explaining how far I went and why in this document.
-   Normally I use GIT differently. I make heavy use of feature branches and only merge into main if the code has been tested and approved. This allows me to revert to any commit on main and be sure I will have a working application.

    As in this project GIT's main purpose was just to show chronological changes I opted for a more speedy workflow where I also push flawed versions of the project. My commits are also a bit larger than what they normally would be; I'm a fan of commit early and often.

    I also wish I had been a bit more consistent with my commit messages. If there are rules for commit messages I am always very strict with them, but I did not set rules for myself in the beginning of the project.

-   I had to brush up on quite a lot of stuff. Things that are usually taken care of by agreeing on certain best practices within the company, and are only rarely revisited. Examples; srcset, font loading, animations, certain mixins, a grid.
-   I was very eager to start the assignment, and looking at my planning I thought it would be easy to deliver on Monday. Normally I try to stick to the principle of 'undersell and overdeliver', but somehow in this case I totally did not do that which resulted in me updating the planning. Of course I'm still well within the 1-2 weeks that Andrei proposed.
-   Browserstack sucks. They used to have a very generous free tier that would actually allow you to use their product for a proper test run, but no more. I will no longer recommend Browserstack.
-   IE11 (debugging) sucks. At my previous job I had set up a good transpiler and some general best practices which made sure IE11 was supported well enough for our needs. This means I hadn't really touched IE11 in about 3-4 years. It was not a nice reunion, but hey.. part of the job.
