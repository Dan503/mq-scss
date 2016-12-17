# mq-scss

An extreamly powerful but easy to use Sass media query mixin

This media query mixin is a powerful tool that lets you easily create far more complex media queries than you would have ever attempted to do with plain css. It also makes your code far easier to maintain through it's ability to take simple media query variables.

##Contents

* [Installation](#installation)
* [Basic usage](#basic-usage)
    * [Min/Max width](#minmax-width)
    * [Inside/Outside](#insideoutside)
    * [Full list of media query ranges](#full-list-of-media-query-ranges)
        * [Single value ranges](#single-value-ranges)
        * [Double value ranges](#double-value-ranges)
* [MQ variables](#mq-variables)
    * [Why name your media queries?](#why-name-your-media-queries)
    * [Enhanced maintainability](#enhanced-maintainability)
    * [How to use an MQ variable](#how-to-use-an-mq-variable)
        * [Naming your MQ variables](#naming-your-mq-variables)
        * [Creating your MQ variables](#creating-your-mq-variables)
* [Combining media queries](#combining-media-queries)
    * [Media query "or" statements](#media-query-or-statements)
    * [Media Query "and" statments](#media-query-and-statements)
* [em conversion](#em-conversion)
* [Defining breakpoints](#defining-breakpoints)
* [Bonus retina display mixin](#bonus-retina-display-mixin)

##Installation

```````````
npm install mq-scss --save
```````````

Import mq-scss at the top of your main Sass file (note that the exact path will differ depending on your folder structure)

``````SCSS
@import "../node_modules/mq-scss/mq";
``````

##Basic usage

````````SCSS
@include mq($range, $larger-breakpoint[, $smaller-breakpoint]){ @content }
````````

###Min/Max width

In this example we state that we want the background of the element to be red by default but change to blue if the screen is less than 600px wide

`````````````SCSS
SASS:

.element {
    background: red;

    @include mq(max, 600px){
        background: blue;
    }
}
`````````````

`````````````CSS
outputted CSS:

.element { background: red; }
@media screen and (max-width: 600px) {
    .element { background: blue; }
}
`````````````


It's just as easy to state a minimum width:

`````````````SCSS
SASS:

.element {
    background: red;

    @include mq(min, 600px){
        background: blue;
    }
}
`````````````

`````````````CSS
outputted CSS:

.element { background: red; }
@media screen and (min-width: 601px) {
    .element { background: blue; }
}
`````````````

Note that in the sass, we state that the width is 600px but it gets outputted as 601px in the CSS. This makes the mixin more intuitive to use and it means you'll never have to worry about that ugly 1px cross over point where `min` and `max` ranges set to the same width display at the same time.


###Inside/Outside

What about those times when you only want a style to be effective within a given range? Perhaps you only want something to be blue if it's a tablet sized screen but not appear on mobile. That is when the `inside` range type comes in handy.

`````````````SCSS
SASS:

.element {
    background: red;

    @include mq(inside, 1024px, 600px){
        background: blue;
    }
}
`````````````

`````````````CSS
outputted CSS:

.element { background: red; }
@media screen and (max-width: 1024px) and (min-width: 601px) {
    .element { background: blue; }
}
`````````````

Again notice how min-width gets outputted as +1 the value given to avoid potential conflicts.

If you want something to be styled a certain way on mobiles and desktops but **not** tablets, we can use the `outside` range type:

`````````````SCSS
SASS:

.element {
    background: red;

    @include mq(outside, 1024px, 600px){
        background: blue;
    }
}
`````````````

`````````````CSS
outputted CSS:

.element { background: red; }
@media not screen and (max-width: 1024px) and (min-width: 601px) {
    .element { background: blue; }
}
`````````````


###Full list of media query ranges

    @include mq([range], XXX, YYY){ /*styles*/ }

Note that orientation and ratio ranges do **not** accept pixel values.

Ratio ranges must be a division in the form of a sting like `'1 / 2'`.

`orientation` only accepts the strings `'portrait'` and `'landscape'`.

####Single value ranges

- **min** : `screen and (min-width: XXX)`
- **max** : `screen and (max-width: XXX)`

- **min-height** : `screen and (min-height: XXX)`
- **max-height** : `screen and (max-height: XXX)`

- **ratio** : `screen and (aspect-ratio: XXX)`
- **min-ratio** : `screen and (min-aspect-ratio: XXX)`
- **max-ratio** : `screen and (max-aspect-ratio: XXX)`

- **device-ratio** : `screen and (device-aspect-ratio: XXX)`
- **min-device-ratio** : `screen and (min-device-aspect-ratio: XXX)`
- **max-device-ratio** : `screen and (max-device-aspect-ratio: XXX)`

- **orientation** : `screen and (orientation: XXX)`

####Double value ranges

- **inside** : `screen and (max-width: XXX) and (min-width: YYY)`
- **outside** : `not screen and (max-width: XXX) and (min-width: YYY)`

- **inside-height** : `screen and (max-height: XXX) and (min-height: YYY)`
- **outside-height** : `not screen and (max-height: XXX) and (min-height: YYY)`

- **inside-ratio** : `screen and (max-aspect-ratio: XXX) and (min-aspect-ratio: YYY)`
- **outside-ratio** : `not screen and (max-aspect-ratio: XXX) and (min-aspect-ratio: YYY)`

- **inside-device-ratio** : `screen and (max-device-aspect-ratio: XXX) and (min-device-aspect-ratio: YYY)`
- **outside-device-ratio** : `not screen and (max-device-aspect-ratio: XXX) and (min-device-aspect-ratio: YYY)`

##MQ variables

There are two very strong reasons for using an MQ variable over writing the media query inline like I've been doing so far.

###Why name your media queries?

Have you ever opened up a style sheet, seen a wall of media queries and not have a clue what any of them are for? Ok you probably understood that a certain block of styles was to make the site look good on mobile, but I'm not talking about that. I mean just from looking at the code, were you able to understand _why_ the developer wrote those styles?

Styles in Media queries are always written with a certain objective in mind. Objectives like making the sidebar full width or making the text smaller. Most of the time, these individual objectives are all lumped under the same media query. To make things even more confusing, each of those little objectives may need to affect multiple elements to achieve the desired result. For example, making the sidebar full width might mean having to making other elements on the page wider as well.

What if you decide later on that you actually want the sidebar to go full width at a larger screen size? You don't want the text shrinking at that larger screen size though, that's good as it is. Well generally you would need to create a new media query and then scour the styles looking for the side bar related stuff, then cherry pick that stuff out. Often that leads to styles being missed and then you being left all dazed and confused about why your site is looking broken. Wouldn't it be easier if the styles were already broken down into the individual objectives that the styling was trying to achieve to begin with?

###Enhanced maintainability

You state the media query once at the top of your SASS file and then you can re-use it as many times as you like. If you need to change it later on, you change it once and it updates across the entire style sheet. In combination with the ability to name the variables based on the objective that they are trying to achieve, MQ variables make working with media queries far easier to maintain.

###How to use an MQ variable

####Naming your MQ variables

I've come up with a bit of a naming convention for them based on BEM. This is how I write a Media Query variable:

`````````````SCSS
$MQ-[element]--[is/not]-[objective]: ([range], [larger-width], [smaller-width]);
`````````````

Here is the breakdown of what each part means

**$MQ** - MQ at the start tells us it's a media query variable (helps when scanning through the code)

**[element]** - The current element name. So for `.car__door` [element] would be `door`

**[is/not]** - A binary true or false declaration. It can be something like "has" or "no" if that makes more sense grammatically. It just has to have an obvious true/false meaning to it. (Most of the time it will be "is")

**[objective]** - a name for the objective you are trying to achieve. Try to keep it short as possible but still clear. I tend to use camelCase for this to keep the grouping clear.

**([range], [larger-width], [smaller-width])** - the exact same as what you would put between the brackets of the media query mixin if you were doing it inline.

####Creating your MQ variables

Here is an example of how to use it (the "not" examples are a little unecessary but I've added them for demonstration):

`````````````SCSS
SASS:

$MQ-module--is-altColor: (inside, 1024px, 600px);
$MQ-module--not-altColor: (outside, 1024px, 600px);

.module {
    @include mq($MQ-module--not-altColor){
        background: red;
    }

    @include mq($MQ-module--is-altColor){
        background: blue;
    }

    &--green {
        @include mq($MQ-module--not-altColor){
            background: green;
        }

        @include mq($MQ-module--is-altColor){
            background: grey;
        }
    }
}
`````````````
`````````````CSS
outputted CSS:

@media not screen and (max-width: 1024px) and (min-width: 601px) {
    .module { background: red; }
}
@media screen and (max-width: 1024px) and (min-width: 601px) {
    .module { background: blue; }
}
@media not screen and (max-width: 1024px) and (min-width: 601px) {
    .module--green { background: green; }
}
@media screen and (max-width: 1024px) and (min-width: 601px) {
    .module--green { background: grey; }
}
`````````````

Ahhhhh!!! It's doubling up on Media queries!!! Think of all that extra weight you're adding!!!

Well actually after gzipping, all the repetative media query declarations [become quite negligable](https://benfrain.com/inline-or-combined-media-queries-in-sass-fight/).

##Combining media queries

###Media query "or" statements

Media Query "or" statements are only possible using an MQ variable.

`````````````SCSS
SASS:

$MQ-element--is-blue:
    (inside, 1024px, 980px),
    (max, 600px)
;

.element {
    background: red;

    @include mq($MQ-element--is-blue){
        background: blue;
    }
}
`````````````

`````````````CSS
outputted CSS:

.element { background: red; }
@media screen and (max-width: 1024px) and (min-width: 981px), screen and (max-width: 600px) {
    .element { background: blue; }
}
`````````````

This technique is most useful when you are targeting a module that is inside a container that is changing in width quite frequently. It's a bit harder to make a counter media query for these though since as long as just a single rule in the or statement is true, the styles will take effect. To effectively create a counter media query for one of these multi queries, you need to carefully target all the gaps in the original statement.

`````````````SCSS
SASS:

$MQ-element--is-blue:
    (inside, 1024px, 980px),
    (max, 600px)
;

$MQ-element--not-blue:
    (min, 1024px),/*$MQ-element--is-blue doesn't go any higher than 1024px*/
    (inside, 980px, 600px)/*$MQ-element--is-blue doesn't target screen sizes between 980px and 600px.*/
    /*$MQ-element--is-blue covers all screen sizes below 600px so no further queries are needed for the counter query*/
;

.element {
    @include mq($MQ-element--is-blue){
        background: blue;
    }
    @include mq($MQ-element--not-blue){
        background: red;
    }
}
`````````````

`````````````CSS
outputted CSS:

@media screen and (max-width: 1024px) and (min-width: 981px), screen and (max-width: 600px) {
    .element { background: blue; }
}
@media screen and (min-width: 1025px), screen and (max-width: 980px) and (min-width: 601px) {
    .element { background: red; }
}
`````````````

###Media Query "and" statments

So the scenario is that you have some styles you want to apply only when both the side bar is full width and the sub heading is hidden. This is the easiest way to do that:

`````````````SCSS
$MQ-sideBar--is-fullWidth: (max, 600px);
$MQ-subHeading--is-hidden: (inside, 800px, 400px);

.module {
    &__sideBar {
        width: 33.33%;
        @include mq($MQ-sideBar--is-fullWidth){
            width: 100%;
        }
    }
    &__subHeading {
        @include mq($MQ-subHeading--is-hidden){
            display: none;
        }
    }
    &__mainHeading {
        @include mq($MQ-sideBar--is-fullWidth){
            @include mq($MQ-subHeading--is-hidden){
                background: red;
            }
        }
    }
}
`````````````

`````````````CSS
outputted CSS:

.module__sideBar { width: 33.33%; }
@media screen and (max-width: 600px) {
    .module__sideBar { width: 100%; }
}
@media screen and (max-width: 800px) and (min-width: 401px) {
    .module__subHeading { display: none; }
}
@media screen and (max-width: 600px) and (max-width: 800px) and (min-width: 401px) {
    .module__mainHeading { background: red; }
}
`````````````

I'm looking into a more streamlined way of incorporating media query "and" statements without having to nest them inside one another like this but currently this is the best available method.

**Warning:**

Any of the range types that contain `outside` in their name do not support this media query nesting technique.

##em conversion

Pixel based media queries can actually appear incorrectly when zooming on some browsers (it's particularly infamous in Safari on Mac).

There are 2 setting variables used to control the em conversion functionality. These settings are defined before the import statment.

````````````SCSS
$mq-ems: true; /*default: false*/
$mq-em-base: 10px; /*default: 16px*/
@import '../node_modules/mq-scss/mq'
````````````

`$mq-ems` defines if the media query mixin should bother doing conversions or not

`$mq-em-base` defines the base value that the media query uses for doing it's em conversion calculations.

##Defining breakpoints

This mixin does not contain any string to pixel value functionality. This is to  keep the mixin modular allowing you to use your own code for defining what the breakpoints should be.

It is very easy to create a breakpoint function though. This is what I use in combination with the mq mixin to make writing media queries a breeze.

`````````SCSS
$breakPoints: (
    'minimum': 300px, //*The smallest width that the site is able to shrink to */
    'tiny': 350px, //*essentially iphones in portrait view only*/
    'small': 480px,
    'mobile': 600px, ///*!MAJOR BREAK POINT!*//*Maximum for strict mobile view*/
    'mid': 770px, //*essentially the maximum for iPads in portrait*/
    'tablet': 960px, ///*!MAJOR BREAK POINT!*/ /*good place to switch to tablet view*/
    'large': 1024px, //*maximum for iPads in landscape*/
    'page': 1200px, ///*!MAJOR BREAK POINT!*//*Point at which the edge of the desktop design meets the edge of the screen*/
);

@function bp($value){
    @return map-get($breakPoints, $value);
}
`````````

You can then use it in combination with the mq mixin like this:

````````SCSS
.element {
    @include mq(max, bp('mobile')){
        //styles go here
    }
}
````````

##Bonus retina display mixin

I've also added a retina display mixin for detecting retina display devices

````````SCSS
@include retina($density: 2) { @content; }
````````

It can be used like this:

````````SCSS
.element {
    @include retina {
        //styles that will only appear on retina screen devices (minimum of 2dppx)
    }
    @include retina(3) {
        //styles that will only appear on retina screen devices that are a minimum of 3dppx
    }
}
````````
