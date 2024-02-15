## Step one; indexing the assignment

The first thing I do when I get an assignment is making sure I understand what is asked and that I am able to do what is asked. In this case it was fairly straightforward; the requirements are clear enough and I made sure that I had all the files needed to build the solution.

From experience I knew it would be handy to have the XD file open so I can inspect sizes, fonts, colors and so on. Unfortunately XD has been moved into 'maintenance mode' since Adobe tried to aquire Figma. This means that Adobe has made it more difficult to download XD.. I actually had to get a subscription to be able to download XD, whereas previously it was a separate product download.

Getting the subscription took over 12 hours to come through, so this delayed my start quite a bit. I would like to suggest to look into moving away from XD for future applicants.

> Fun fact; the Adobe-Figma proposed merger has very recently come to a halt as they could not get regulatory approval, so XD's death was in vain.

## Step two; decide on the process

The goal of this project is not to have the files of a working range calculator on a landing page but rather to display my skill level and way of working. For that reason I find it important to make a conscious decision on how I'm going to work on this project and how I can best showcase the entire process; not only the final result.

I chose to use git and keep track of my (thought) process by writing this document.

The reason why I decided to use git is twofold:

1. It shows how I use git; an invaluable tool for collaborative development and version control.
2. It provides a timeline of my development as opposed to only the final result. As iterative development is important in agile environments I decided to use git to show my approach / iterations.

The reason why I decided to write this process document is also twofold;

1. This process document is easier to read than opening a bunch of commits.
2. This document allows me to also write about what I did _not_ commit; this can be just as important if you want to get a feel of my way of working.

Let's get started.

## Step three; blocking the design (~5 minutes)

When I get a design, I usually make a mental map of the rough html layout. If the design is complex I grab a piece of paper and actually 'block out' the various elements of the design. To visualize this, I opened paint and made [this](</workfiles/progress images/landing-example-boxed.jpg>) for you guys.

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

I will most likely work on the styling part here and there during this step as I like to alternate between different kind of jobs, but the focus of this step will be the range-calculator.

As this part is the most technically challenging, I will keep track of my overall thought process and findings;

-   I have four inputs. If any of the input's value is changed, I need to determine a range for all model-s types (100D & P100D) based on data in a JSON and then update the DOM accordingly.

    -   I will first make sure I have access to the data. Since I have not read any limitation on how I get access to the data, I assume I can simply hard-code it as a JSON object within my application. This makes the whole setup easier; I will not need to run a local webserver to be able to fetch the files.
    -   I do not know whether I am allowed to alter the structure of the data, so at least initially I won't.
    -   Ever since I saw the project I had this funky idea of transforming the data into an object where I can simply get the range by accessing an object like so: `data_100d[temperature][wheelsize][ac][kmh]`. I think this results in a smaller JSON object and it should be really fast.
    -   Initially I will simply implement a .find() on the data array and try to find a match. If later I have time left I will also try the funky way by transforming the data. I am curious how difficult it is and what the performance difference will be.
    -   I want to set everything up in such a way that it is easy to add or remove a model, let's see if I can do that within a reasonable amount of time.

The first iteration is done and I'm happy with how the reactivity works as it uses as much native implementations as possible. The only inputs that require a bit more work are the number inputs as I could not style the native up/down buttons. Instead I hide the native buttons by disabling the input and then I implemented custom buttons. These buttons use native functions to increase the input's value by the `step` value: `stepUp()` and `stepDown()`.

I was hoping this would internally trigger an event, for example `change`, but sadly it doesn't. This means I had to manually create an event and fire it. I chose to use the `change` event as this event is used for the other types of input.

At this point I'm not that happy with the code structure yet for various reasons. I will improve that in the next iteration by turning the range-calculator into a class. This has the benefits of encapsulation and scope management; grouping related variables and functions together improves organization and readablity, and on top of that reduces the polution of the global scope. I swear I'm writing everything myself and not use ChatGPT for it :').

## Step six; the range-calculator - class-based (~0.5 hours)

While turning the range-calculator into a class I also decided to go for pure functions. This usually makes it easier for me to see the flow of the code and gives me some handholds on how to structure the code. I did not go for a 100% implementation time-wise, I might look into it more later.

I also improved some of the checks to make the code more defensive, altho it's quite difficult to know how far to go with this in a hypothetical project.

At this point I'm relatively happy with how the code is structured and how it performs. I tried to set it up quite dynamically; in such a way that it's easy to add/change inputs, car types and datasets. Of course the code is still very much coupled to a specific HTML implementation. I did consider building the `.ranges` and `.controls` with javascript. That would have the benefit of not needing to update the html manually as the constructor parameters change, but thought that went a bit far for this assignment.

## Step seven; implement XD design. (~2.5 hour)

Next up I wanted to implement the XD design. First the desktop version and then touch up for other screensizes with media queries.

I quickly felt the need for more structured and readable css, so I opted for implementing SCSS. During this I noticed that the file/folder structure was becoming a bit of a mess so decided to do a cleanup. An assets folder for project assets, workfiles folder for everything related to source materials and process stuff. I did decide to keep `PROCESS.MD` in the root to make the chance anyone misses it as small as possible.

The file/folder structure cleanup and some npm fiddling later I had a nice clean folder structure and scss up and running. Time to style this page.

-   First step to more structured and readable css was to split into multiple files. I decided to go for a basic implementation of the 7-1 pattern.
-   Chose to inline the SVG for easy color-changes via CSS for the hover effect.
-   I usually try to only use margin-bottom and margin-right for specific spacing as it makes it easier to debug layout issues.
-   Added wheels. Used %-based absolute positioning within container to make sure wheels stay in place on all resolution.
-   Added wheel rotation animation. Might make the speed depend on input speed later.
-   Updated most images to use srcset for responsive image optimization.
-   Found the font on google webfonts, loading via URL. Seemed way more performant than loading the local files. Also a chance the user already has the font downloaded from a different website.
-   I am very much used to sticking to a certain grid of values for things like spacing. The different spacing values used in the XD drove me crazy, and here and there I decided to alter them slightly to be a bit more consistent.
-   The amount of different colors and fonts was also surprising but ultimately I decided to not change those. Definitely a point of feedback for the XD designer tho - do we really need so many different colors / spacing / font-sizes / line-heights? The footer is a good example of a whole bunch of different styles used close to each other. In the end it is up to the (UX)designer of course, but I would definitely feel responsible as a front-end developer to talk about this - in a constructive manner of course.
-   Implementing the html/css for the controls was a tedious job.

## Next steps

What I would have done if I had a bit more time;

-   The lists in the footer are most likely suposed to be links, but I did not implement them as such. If I would, I would take note of properly implementing `mailto` & `tel:`.

## Final notes

-   The most difficult part of the assignment was to try and be as transparent as possible during the process, while also not overloading you guys with a lot of useless information. This comment will bite me in the ass if it turns out my implementation is terrible, but so be it!
-   Normally I use GIT differently. I make heavy use of feature branches and only merge into main if the code has been tested and approved. This allows me to revert to any commit on main and be sure I will have a working application. As in this project GIT's main purpose was just to show chronological changes I opted for a more speedy workflow where I also push flawed versions of the project. My commits are also a bit larger than what they normally would be; I'm a fan of commit early and often.
-   Had to brush up on quite a lot of stuff. Things that are usually taken care of by agreeing on certain best practices within the company, and are only rarerly revisited. Examples; srcset, font loading, animations.

## Learnings

-   I was very eager to start the assignment, and looking at my planning I thought it would be easy to deliver on Monday. Normally I try to stick to the principle of 'undersell and overdeliver', but somehow in this case I totally did not do that which resulted in me updating the planning. Of course I'm still well within the 1-2 weeks that Andrei proposed, but my initial communication should have been better.
