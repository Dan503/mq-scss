# mq-scss

An extremely powerful but easy to use Sass media query mixin that allows you to create almost any media query you can imagine.

This media query mixin is a powerful tool that lets you easily create far more complex media queries than you would have ever attempted to do with plain css. It also makes your code far easier to maintain through it's ability to take simple media query variables.

I've set up a [test/demo site](https://dan503.github.io/mq-scss/). It primarily exists for testing but it does a pretty decent job of demoing what mq-scss can do as well.

## mq-scss family <!-- omit in toc -->

If you enjoy using mq-scss, you may also enjoy using these:

- [mq-js:](https://www.npmjs.com/package/mq-js) Allows you to use mq-scss style media queries in your JavaScript files.
- [query-list:](https://www.npmjs.com/package/query-list) An mq-scss style work around for the lack of container queries in CSS.

## Contents <!-- omit in toc -->

- [Installation](#installation)
- [Basic usage](#basic-usage)
    - [Min/Max width](#minmax-width)
        - [Min/Max width long hand](#minmax-width-long-hand)
    - [Inside/Outside](#insideoutside)
        - [Changing which value comes first](#changing-which-value-comes-first)
    - [Ratio based media queries](#ratio-based-media-queries)
    - [Full list of media query ranges](#full-list-of-media-query-ranges)
        - [Single value ranges](#single-value-ranges)
        - [Double value ranges](#double-value-ranges)
- [MQ variables](#mq-variables)
    - [Why name your media queries?](#why-name-your-media-queries)
    - [Enhanced maintainability](#enhanced-maintainability)
    - [How to use an MQ variable](#how-to-use-an-mq-variable)
        - [Naming your MQ variables](#naming-your-mq-variables)
        - [Creating your MQ variables](#creating-your-mq-variables)
- [Combining media queries](#combining-media-queries)
    - [Media query `or` statements](#media-query-or-statements)
    - [Media Query `plus` statements](#media-query-plus-statements)
    - [!IMPORTANT! limitations of `plus`](#important-limitations-of-plus)
- [Defining media types](#defining-media-types)
    - [Media only queries](#media-only-queries)
    - [The `not` media type](#the-not-media-type)
- [em conversion](#em-conversion)
- [Defining breakpoints](#defining-breakpoints)
- [Debug](#debug)
- [Bonus retina display mixin](#bonus-retina-display-mixin)
- [For contributors](#for-contributors)
- [Change log](#change-log)

## Installation

If you have never used npm before, install [Node.js](https://nodejs.org). Then set a command line interface to your project folder (`cd C:/path/to/folder`). Then run `npm init` and follow the prompts.

Everyone needs to do these next two steps:

```````````

npm install mq-scss --save

```````````

Import mq-scss at the top of your main Sass file (note that the exact path will differ depending on your folder structure).

``````scss
@import "../node_modules/mq-scss/mq";
``````

## Basic usage

``````scss
@include mq($range, $breakpoint_1 [, $breakpoint_2] [, $mediaType] [, $debug]){ @content }
``````

### Min/Max width

In this example we state that we want the background of the element to be red by default but change to blue if the screen is less than or equal to 600px wide.

`````````````scss
// SCSS

.element {
    background: red;

    @include mq(max, 600px){
        background: blue;
    }
}
`````````````

`````````````css
/* outputted css: */

.element { background: red; }

@media (max-width: 600px) {
    .element { background: blue; }
}
`````````````


It's just as easy to state a minimum width:

`````````````scss
// SCSS

.element {
    background: red;

    @include mq(min, 600px){
        background: blue;
    }
}
`````````````

`````````````css
/* outputted css: */

.element { background: red; }

@media (min-width: 601px) {
    .element { background: blue; }
}
`````````````

Note that in the sass, we state that the width is 600px but it gets outputted as 601px in the css. This makes the mixin more intuitive to use and it means you'll never have to worry about that ugly 1px cross over point where `min` and `max` ranges set to the same width display at the same time.

#### Min/Max width long hand

 As of v1.3.1, if you prefer to use `max-width` and `min-width` instead of `max` and `min` you can.

`````````````scss
// SCSS

// Both this:
.element {
    background: red;

    @include mq(min, 800px){
        background: blue;
    }

    @include mq(max, 600px){
        background: green;
    }
}

// And This:
.element {
    background: red;

    @include mq(min-width, 800px){
        background: blue;
    }

    @include mq(max-width, 600px){
        background: green;
    }
}

// Produces this CSS:
.element {
  background: red;
}
@media (min-width: 801px) {
  .element {
    background: blue;
  }
}
@media (max-width: 600px) {
  .element {
    background: green;
  }
}
`````````````

### Inside/Outside

What about those times when you only want a style to be effective within a given range? Perhaps you only want something to be blue if it's a tablet sized screen but not appear on mobile. That is when the `inside` range type comes in handy.

`````````````scss
// SCSS

.element {
    background: red;

    @include mq(inside, 1024px, 600px){
        background: blue;
    }
}
`````````````

`````````````css
/* outputted css: */

.element { background: red; }

@media (max-width: 1024px) and (min-width: 601px) {
    .element { background: blue; }
}
`````````````

Again notice how min-width gets outputted as +1 the value given to avoid potential conflicts.

If you want something to be styled a certain way on mobiles and desktops but **not** tablets, we can use the `outside` range type instead:

`````````````scss
// SCSS

.element {
    background: red;

    @include mq(outside, 1024px, 600px){
        background: blue;
    }
}
`````````````

`````````````css
/* outputted css: */

.element { background: red; }

@media (max-width: 600px), (min-width: 1025px) {
    .element { background: blue; }
}
`````````````

Also, as of version 1.3.2, if you prefer to explicitly state `width` when using `inside` and `outside`, you can use the alternate `inside-width` and `outside-width` syntax.

`````````````scss
// SCSS

// Both this:
.element {
    @include mq(inside, 1024px, 600px){
        background: blue;
    }
}

// And this this:
.element {
    @include mq(inside-width, 1024px, 600px){
        background: blue;
    }
}

// Produces this css:
@media (max-width: 1024px) and (min-width: 601px) {
    .element { background: blue; }
}
`````````````

#### Changing which value comes first

As of version 1.2.0, you no longer need to worry about which value you use first. Place the breakpoint values in any order and the mixin will figure it out from there. 

Prior to v1.2.0 You needed to set an `$mq-largest-first` global setting variable to `false` if you wanted to place the smaller breakpoint before the larger breakpoint. That is no longer necessary.


### Ratio based media queries

Ratio ranges must be a division in the form of a sting like `'2 / 1'` (width / height). That example meaning that the screen width is 2 times the size of the screen height. Ratio ranges do not accept pixel values.

`````````````scss
// SCSS

.element {
    background: red;

    @include mq(min-ratio, '2 / 1'){
        background: blue;
    }
}
`````````````

`````````````css
/* outputted css: */

.element { background: red; }

@media (min-aspect-ratio: 2 / 1) {
    .element { background: blue; }
}
`````````````

It is easiest to think of ratio based media queries as always being based more on the width than the height. For example, `mq('min-ratio', '2 / 1')` will be active at a ratio of `3 / 1` but not at a ratio of `1 / 1` or `2 / 3`. `min-ratio` acts a little bit like `min-width` in this sense. Since `3 / 1` is wider than `2 / 1` it will be active but both `1 / 1` and `2 / 3` are thinner than `2 / 1` so those are not active.

There are 2 types of ratio based media queries, "aspect-ratio" (shortened to just `ratio` in the mq mixin) and "device-aspect-ratio" (shortened to `device-ratio` in the mq mixin). It is generally best to stick with "aspect-ratio" rather than "device-aspect-ratio" since "aspect-ratio" is determined by the users browser window size. "device-aspect-ratio" is based on the physical screen size of the users device. With "aspect-ratio" you can see the effects by just resizing the browser window. With "device-aspect-ratio" you will physically have to look at the site on a different screen in order to see the effect... or look at the site with the Chrome dev tools screen emulator open (Chromes screen emulator obeys "device-aspect-ratio" media queries).

Ratio based media queries are mostly useful for when you have sites that have displays that take up the full screen. Displays like this tend to need media queries that understand both the users screen height and width at the same time. You may need to combine the ratio based media query with a more traditional pixel based media query for it to have the greatest effect. Read the [Media Query `plus` statements](#media-query-plus-statements) section for more details on how to do that.

Unlike `min-width` and `min-height`, `min-ratio` will actually conflict with `max-ratio`. To learn how to avoid this, read through the [`not` media type](#the-not-media-type) section.

### Full list of media query ranges

    @include mq([range], XXX, YYY){ /*styles*/ }

These examples are based on XXX being a larger value than YYY.

Note that orientation and ratio ranges do **not** accept pixel values.

Also, `orientation` only accepts the strings `'portrait'` and `'landscape'`.

#### Single value ranges

- **min** : `(min-width: XXX)`
- **max** : `(max-width: XXX)`

- **min-width** : (same as `min`)
- **max-width** : (same as `max`)

- **min-height** : `(min-height: XXX)`
- **max-height** : `(max-height: XXX)`

- **ratio** : `(aspect-ratio: XXX)`
- **min-ratio** : `(min-aspect-ratio: XXX)`
- **max-ratio** : `(max-aspect-ratio: XXX)`

- **device-ratio** : `(device-aspect-ratio: XXX)`
- **min-device-ratio** : `(min-device-aspect-ratio: XXX)`
- **max-device-ratio** : `(max-device-aspect-ratio: XXX)`

- **orientation** : `(orientation: XXX)`

#### Double value ranges

- **inside** : `(max-width: XXX) and (min-width: YYY)`
- **outside** : `(max-width: YYY), (min-width: XXX)`

- **inside-width** : (same as `inside`)
- **outside-width** : (same as `outside`)

- **inside-height** : `(max-height: XXX) and (min-height: YYY)`
- **outside-height** : `(max-height: YYY), (min-height: XXX)`

- **inside-ratio** : `(max-aspect-ratio: XXX) and (min-aspect-ratio: YYY)`
- **outside-ratio** : `(max-aspect-ratio: YYY), (min-aspect-ratio: XXX)`

- **inside-device-ratio** : `(max-device-aspect-ratio: XXX) and (min-device-aspect-ratio: YYY)`
- **outside-device-ratio** : `(max-device-aspect-ratio: YYY), (min-device-aspect-ratio: XXX)`


## MQ variables

There are two very strong reasons for using an MQ variable over writing the media query inline like I've been doing so far.

### Why name your media queries?

Have you ever opened up a style sheet, seen a wall of media queries and not have a clue what any of them are for? Ok you probably understood that a certain block of styles was to make the site look good on mobile, but I'm not talking about that. I mean just from looking at the code, were you able to understand _why_ the developer wrote those styles?

Styles in Media queries are always written with a certain objective in mind. Objectives like making the sidebar full width or making the text smaller. Most of the time, these individual objectives are all lumped under the same media query. To make things even more confusing, each of those little objectives may need to affect multiple elements to achieve the desired result. For example, making the sidebar full width might mean having to making other elements on the page wider as well.

What if you decide later on that you actually want the sidebar to go full width at a larger screen size? You don't want the text shrinking at that larger screen size though, that's good as it is. Well generally you would need to create a new media query and then scour the styles looking for the side bar related stuff, then cherry pick that stuff out. Often that leads to styles being missed and then you being left all dazed and confused about why your site is looking broken. Wouldn't it be easier if the styles were already broken down into the individual objectives that the styling was trying to achieve in the first place?

### Enhanced maintainability

You state the media query once at the top of your Sass file and then you can re-use it as many times as you like. If you need to change it later on, you change it once and it updates across the entire style sheet. In combination with the ability to name the variables based on the objective that they are trying to achieve, MQ variables make working with media queries far easier to maintain.

### How to use an MQ variable

#### Naming your MQ variables

I've come up with a bit of a naming convention for them based on BEM. If you don't agree with the naming convention, feel free not to use it. It's just a variable name and has no effect on the mixin itself.

This is how I write an Media Query variable:

`````````````scss
$MQ-[element]__[property]--[state]: ([range], [breakpoint-1], [breakpoint-2]);
`````````````

Here is the breakdown of what each part means. I tend to use camelCase for each group to keep the grouping clear.

**$MQ** - MQ at the start tells us that it's a media query variable (helps when scanning through the code).

**[element]** - The target element name. So for `.car__door` [element] would be `door`.

**[property]** - This one is optional. It represents the main css property that you are catering for in the media query.

**[state]** - A name for the state that the element is in when the media query is true. Try to keep it as short as possible but still clear.

**([range], [breakpoint-1], [breakpoint-2])** - the exact same as what you would put between the brackets of the media query mixin if you were doing it inline.

#### Creating your MQ variables

Here is an example of how to use it:

`````````````scss
// SCSS

$MQ-element__color--main: (inside, 1024px, 600px);
$MQ-element__color--alt: (outside, 1024px, 600px);

.module {
    &__element {
        @include mq($MQ-element__color--main){
            background: red;
        }

        @include mq($MQ-element__color--alt){
            background: blue;
        }

        &--green {
            @include mq($MQ-element__color--main){
                background: green;
            }

            @include mq($MQ-element__color--alt){
                background: grey;
            }
        }
    }
}
`````````````

`````````````css
/* outputted css: */

@media (max-width: 1024px) and (min-width: 601px) {
    .module__element {
      background: red;
    }
}

@media (max-width: 600px), (min-width: 1025px) {
    .module__element {
      background: blue;
    }
}

@media (max-width: 1024px) and (min-width: 601px) {
    .module__element--green {
      background: green;
    }
}

@media (max-width: 600px), (min-width: 1025px) {
    .module__element--green {
      background: grey;
    }
}
`````````````

Ahhhhh!!! It's doubling up on Media queries!!! Think of all that extra weight you're adding!!!

Well actually after gzipping, all the repetitive media query declarations [become quite negligible](https://benfrain.com/inline-or-combined-media-queries-in-sass-fight/).

## Combining media queries

### Media query `or` statements

Media Query `or` statements are only possible using an MQ variable.

`````````````scss
// SCSS

$MQ-element__color--alt: (
    (inside, 1024px, 980px),
    (max, 600px)
);

.element {
    background: red;

    @include mq($MQ-element__color--alt){
        background: blue;
    }
}
`````````````

`````````````css
/* outputted css: */

.element { background: red; }

@media (max-width: 1024px) and (min-width: 981px), (max-width: 600px) {
    .element { background: blue; }
}
`````````````

This technique is most useful when you are targeting a module that is inside a container that is changing in width quite frequently. It's a bit harder to make a counter media query for these though since as long as just a single rule in the or statement is true, the styles will take effect. To effectively create a counter media query for one of these multi queries, you need to carefully target all the gaps in the original statement.

`````````````scss
// SCSS

$MQ-element__color--main: (
    (inside, 1024px, 980px),
    (max, 600px)
);

$MQ-element__color--alt: (
    //*$MQ-element__color--main does not go any higher than 1024px*/
    (min, 1024px),

    //*$MQ-element__color--main does not target screen sizes between 980px and 600px.*/
    (inside, 980px, 600px)

    //*$MQ-element__color--main covers all screen sizes below 600px so no further queries are needed for the counter query*/
);

.element {
    @include mq($MQ-element__color--main){
        background: red;
    }
    @include mq($MQ-element__color--alt){
        background: blue;
    }
}
`````````````

`````````````css
/* outputted css: */

@media (max-width: 1024px) and (min-width: 981px), (max-width: 600px) {
    .element { background: blue; }
}

@media (min-width: 1025px), (max-width: 980px) and (min-width: 601px) {
    .element { background: red; }
}
`````````````

### Media Query `plus` statements

So the scenario is that you have some styles you want to apply only when both the side bar is full width and the sub heading is hidden. This is the easiest way to do that:

`````````````scss
// SCSS

$MQ-sideBar__width--full: (max, 600px);
$MQ-subHeading--hidden: (inside, 800px, 400px);
$MQ-mainHeading--red: ($MQ-sideBar__width--full plus $MQ-subHeading--hidden);

.module {
    &__sideBar {
        width: 33.33%;
        @include mq($MQ-sideBar__width--full){
            width: 100%;
        }
    }
    &__subHeading {
        @include mq($MQ-subHeading--hidden){
            display: none;
        }
    }
    &__mainHeading {
        @include mq($MQ-mainHeading--red){
            //Styles that only apply when both the sidebar is full width and the subheading is hidden
            background: red;
        }
    }
}
`````````````

`````````````css
/* outputted css: */

.module__sideBar { width: 33.33%; }

@media (max-width: 600px) {
    .module__sideBar { width: 100%; }
}

@media (max-width: 800px) and (min-width: 401px) {
    .module__subHeading { display: none; }
}

@media (max-width: 600px) and (max-width: 800px) and (min-width: 401px) {
    .module__mainHeading { background: red; }
}
`````````````

This technique utilises the `plus` keyword (introduced in version 1.3.0) to glue the two media queries together into a single, more easily transportable, combined MQ variable.

This can also be done inline as a one off like this:

`````````````scss
// SCSS

$MQ-sideBar__width--full: (max, 600px);
$MQ-subHeading--hidden: (inside, 800px, 400px);

.module {
    &__sideBar {
        width: 33.33%;
        @include mq($MQ-sideBar__width--full){
            width: 100%;
        }
    }
    &__subHeading {
        @include mq($MQ-subHeading--hidden){
            display: none;
        }
    }
    &__mainHeading {
        @include mq($MQ-sideBar__width--full plus $MQ-subHeading--hidden){
            //Styles that only apply when both the sidebar is full width and the subheading is hidden
            background: red;
        }
    }
}
`````````````

It will even work as part of an `or` statement:

`````````````scss
// SCSS

$MQ-subHeading--hidden: (inside, 800px, 400px);
$MQ-sideBar__width--full: (max, 600px);

$MQ-mainHeading--red: (
    (min-ratio, '2 / 1') plus $MQ-subHeading--hidden,
    $MQ-sideBar__width--full
);

.module {
    &__sideBar {
        width: 33.33%;
        @include mq($MQ-sideBar__width--full){
            width: 100%;
        }
    }
    &__subHeading {
        @include mq($MQ-subHeading--hidden){
            display: none;
        }
    }
    &__mainHeading {
        @include mq($MQ-mainHeading--red){
            background: red;
        }
    }
}
`````````````

`````````````css
/* outputted css: */

.module__sideBar {
  width: 33.33%;
}

@media (max-width: 600px) {
  .module__sideBar {
    width: 100%;
  }
}

@media (max-width: 800px) and (min-width: 401px) {
  .module__subHeading {
    display: none;
  }
}

@media (min-aspect-ratio: 2 / 1) and (max-width: 800px) and (min-width: 401px), (max-width: 600px) {
  .module__mainHeading {
    background: red;
  }
}
`````````````

You can also string multiple `plus` statements together:

`````````````scss
// SCSS

$MQ-a: (inside, 800px, 400px);
$MQ-b: (max, 600px);

$MQ-c: ($MQ-a plus $MQ-b plus (min-ratio, '2 / 1'));

.module {
    @include mq($MQ-c){
        background: red;
    }
}
`````````````

`````````````css
/* outputted css: */

@media (max-width: 800px) and (min-width: 401px) and (max-width: 600px) and (min-aspect-ratio: 2 / 1) {
  .module {
    background: red;
  }
}
`````````````

### !IMPORTANT! limitations of `plus`

You should note that `plus` does not work in all situations. There are some restrictions around using the `plus` keyword that you should be aware of.

#### It can not be used in conjunction with any `outside` range type <!-- omit in toc -->

The following code **will not work** and will throw an error stating that all `outside` range types (`outside`, `outside-height`, `outside-ratio`, `outside-device-ratio`) are incompatible with `plus` statements.

`````````````scss
// SCSS

$MQ-a: (outside, 800px, 400px);
$MQ-b: (max, 600px);

$MQ-c: ($MQ-a plus $MQ-b);

.module {
    @include mq($MQ-c){
        background: red;
    }
}
`````````````

#### `plus` statements can not contain any `or` statements <!-- omit in toc -->

`or` statements can contain `plus` statements however `plus` statements can not contain `or` statements.

The following code **will not work** and will throw an error stating that `or` statements can't be placed inside `plus` statements.

`````````````scss
// SCSS

$MQ-a: (
    (inside, 1200px, 800px),
    (max, 400px)
);
$MQ-b: (max, 600px);

$MQ-c: ($MQ-a plus $MQ-b);

.module {
    @include mq($MQ-c){
        background: red;
    }
}
`````````````


#### Work arounds <!-- omit in toc -->

You can generally get around these issues by placing the `plus` statement inside `or` statements.

So instead of this:

`````````````scss
// SCSS

$MQ-a: (outside, 800px, 400px);
$MQ-b: (max, 600px);

$MQ-c: ($MQ-a plus $MQ-b);

.module {
    @include mq($MQ-c){
        background: red;
    }
}
`````````````

Do this:

`````````````scss
// SCSS

$MQ-a: (outside, 800px, 400px);
$MQ-b: (max, 600px);

$MQ-c: (
    ((max, 400px) plus $MQ-b),
    ((min, 800px) plus $MQ-b)
);

.module {
    @include mq($MQ-c){
        background: red;
    }
}
`````````````
`````````````css
/* outputted css */

@media (max-width: 400px) and (max-width: 600px), (min-width: 801px) and (max-width: 600px) {
  .module {
    background: red;
  }
}
`````````````

Alternatively, as of version 1.2.0, you can utilise the native media query merging feature in Sass to sort out the media queries for you (as long as you don't mind them being outside of variables).

`````````````scss
// SCSS

$MQ-a: (outside, 800px, 400px);
$MQ-b: (max, 600px);

.module {
    @include mq($MQ-a){
        @include mq($MQ-b){
            background: red;
        }
    }
}
`````````````
`````````````css
/* outputted css */

@media (max-width: 400px) and (max-width: 600px), (min-width: 801px) and (max-width: 600px) {
  .module {
    background: red;
  }
}
`````````````

## Defining media types

By default, mq-scss doesn't apply a media type to the media-queries it generates. As of v2.0.0, you can now declare custom media types in your media queries.

Let's say that you are making a fancy print style sheet and only want to target this media query at printers. Here is how to go about it:

`````````````scss
// SCSS

.element {
    @include mq(min, 800px, 'print'){
        color: red;
    }
}
`````````````
`````````````css
/* outputted css */

@media print and (min-width: 801px) {
  .element {
    color: red;
  }
}
`````````````

Note that if you get an error that looks like this:

``````
Error: media query expression must begin with '('
``````

It is most likely because you have entered a media type that sass doesn't recognize. I want to avoid having to maintain a list of valid media type expressions so I don't intend on clarifying this error.

Here are some more examples of how you can use the media type declaration:

`````````````scss
// SCSS

.element {
    @include mq(outside, 800px, 900px, 'only screen'){
        color: red;
    }
}
`````````````
`````````````css
/* outputted css */

@media only screen and (max-width: 800px), only screen and (min-width: 901px) {
  .element {
    color: red;
  }
}
`````````````

This one is a bit ridiculous but it at least shows the level of freedom you have when declaring media types:

`````````````scss
// SCSS

$mq: (
    (inside, 1000px, 1200px, 'screen'),
    (max, 800px, 'only print') plus (min-ratio, '2 / 1')
)

.element {
    @include mq($mq){
        color: red;
    }
}
`````````````
`````````````css
/* outputted css */

@media screen and (max-width: 1200px) and (min-width: 1001px), only print and (max-width: 800px) and (min-aspect-ratio: 2/1) {
  .element {
    color: red;
  }
}
`````````````

An important thing to note about media types and `plus` statements. Only the media type that is defined at the _start_ of the plus statement will be honoured. All other media types will be ignored.

`````````````scss
// SCSS

// "screen" is ignored
.media-ignored {
    @include mq((max, 1000px) plus (min, 800px, 'screen')){
        color: red;
    }
}

// "screen" is honoured
.media-added {
    @include mq((max, 1000px, 'screen') plus (min, 800px)){
        color: green;
    }
}

`````````````
`````````````css
/* outputted css */

@media (max-width: 1000px) and (min-width: 801px) {
  .media-ignored {
    color: red;
  }
}

@media screen and (max-width: 1000px) and (min-width: 801px) {
  .media-added {
    color: green;
  }
}
`````````````

### Media only queries

This was introduced in version 2.1.0. This is now a completely valid mq-scss statement:

````scss
@include mq('print'){
    body { color: #000; }
}
````
````css
/* output css */
@media print {
    body { color: #000; }
}
````

Using it in that way is kind of counter productive since it takes more characters to type it out than the raw css version. Where the strength comes is from utilizing it in `or` and `plus` statements.

Here is a `plus` statement example:

````scss
$MQ-plusExample: 'screen' plus (inside, 600px, 1000px);
@include mq($MQ-plusExample){
    body { color: #000; }
}
````
````css
/* output css */
@media screen and (max-width: 1000px) and (min-width: 601px) {
    body { color: #000; }
}
````

This lets you place `'screen'` at the start and join it to the rest of the query with a `plus` statement. This makes it feel much closer to real css while still keeping all the advantages of the mq-scss syntax. Remember that `plus` statements are not compatible with `outside` range types though so those still need to use the v2.0.0 syntax.

Here is an `or` example.

````scss
$MQ-orExample: (
    (min, 1200px),
    'print'
);
@include mq($MQ-orExample){
    body { color: #000; }
}
````
````css
/* output css */
@media (min-width: 1201px), print {
    body { color: #000; }
}
````

The use case in this example is that you always want the print styles to be based on the desktop version of the site even if printing from a mobile device. By placing `'print'` on it's own in the or statement, it will always print based on the desktop styles no matter what the current screen size is.

### The `not` media type

`'not'` is an interesting media type. It was introduced in v2.1.0 as a short-hand for `not screen` (then updated in v2.1.3 to output `not all`).

`'not'` will essentially invert the media query. You could use this for helping you write counter queries however I would caution against this. In general, using `'not'` is fine. However, if you try and nest another media query inside of it, or you nest the `'not'` statement inside a different media query, Sass can output some very odd and unexpected results. This is the reason version 1.0.0 of mq-scss couldn't support nested `outside` statements. It was essentially using `not inside` to produce the media query.

There is at least one very good use case for using the `'not'` media type though. Take a look at the Ratio section of the [mq-scss test site](https://dan503.github.io/mq-js/#ratio) and resize your browser to exactly 800px wide by 400px tall. You will notice that they all return `true` since your screen is at exactly a `2 / 1` ratio and they all share that `2 / 1` ratio in their media query. Increase or decrease the size of your window by just a single pixel and you will see some of them swap to returning false.

I couldn't build protection against this into the core mq-scss mixin since I couldn't just add +1 pixel to a ratio like I could with width and height. I also didn't want to use `'not'` in the core mixin since that would prevent all cases of `min-ratio` from being compatible with media query nesting. There is nothing stopping you from using `'not'` to solve this issue yourself though.

In order to use a `min-ratio` that works in the same sort of way that `min-height` and `min-width` work, you actually need to use `'not'` in combination with a `max-ratio` statement.

````scss
//equivalent to (min-ratio, '2 / 1') but without the 1px sour spot
@include mq(max-ratio, '2 / 1', 'not') {
    body { color: #000; }
}

//same as above but formatted to place the 'not' at the start
@include mq('not' plus (max-ratio, '2 / 1')) {
    body { color: #000; }
}

````

````css
/* output css for both */
@media not all and (max-aspect-ratio: 2 / 1) {
    body { color: #000; }
}
````

## em conversion

Pixel based media queries can actually appear incorrectly when zooming on some browsers (it's particularly infamous in Safari on Mac).

There are 2 setting variables used to control the em conversion functionality. These settings are defined before the import statement.

````````````scss
$mq-ems: true; //*default: false*/
$mq-em-base: 10px; //*default: 16px*/
@import '../node_modules/mq-scss/mq';
````````````

**$mq-ems** defines if the media query mixin should bother doing conversions or not.

**$mq-em-base** defines the base value that the media query uses for doing it's em conversion calculations.

## Defining breakpoints

This mixin does not contain any string to pixel value functionality. This is to keep the mixin modular allowing you to use your own code for defining what the breakpoints should be.

The easiest way to set up a batch of breakpoints is to save them all as Sass variables, then call on them when using the mixin.

`````````scss
// SCSS

$BP-minimum: 320px;
$BP-tiny: 350px;
$BP-small: 480px;
$BP-mobile: 600px;
$BP-phablet: 770px;
$BP-tablet: 960px;
$BP-large: 1024px;
$BP-page: 1200px;

.element {
    @include mq(max, $BP-mobile){
        //styles go here
    }
}
`````````

## Debug

As of version 2.1.0, you can now access some debug information. You have 2 options available to you; local, and global.

The easiest option is using the local method. Simply set the `$debug` property of the mixin to `true` and you will be given access to the debug information.

````scss
.element {
    //Show debug info for only this media query
    @include mq(inside, 600px, 1000px, $debug: true){
        //styles go here
    }
}
````

That example would produce a log in your console that looks like this:

````
mq-scss/_mq.scss:378 DEBUG: inside
mq-scss/_mq.scss:397 DEBUG: inline_mq_values (range: inside, breakpoint_1: 600px, breakpoint_2: 1000px, mediaType: false, mediaOnly: false)
mq-scss/_mq.scss:248 DEBUG: get_values_result (range: inside, breakpoint_1: 600px, breakpoint_2: 1000px, media: "")
mq-scss/_mq.scss:90 DEBUG: calculateMQ (range: inside, breakpoint_1: 1000px, breakpoint_2: 600px, mediaType: false)
mq-scss/_mq.scss:421 DEBUG: !!!!! FINAL OUTPUT: @media (max-width: 1000px) and (min-width: 601px)
````

The other option is to turn debugging on globally. Set `$mq-debug` to `true` before the mixin import statement and it will produce debug information for every media query you have created with mq-scss across the entire site. I don't find this as useful as debugging individual mq-scss media queries but it's there if you want it.

````scss
//Show debug info for all media-queries across the entire site
$mq-debug: true;
@import '../node_modules/mq-scss/_mq';
````

## Bonus retina display mixin

I've also added a retina display mixin for detecting retina display devices

````````scss
@include retina($density: 2) { @content; }
````````

It can be used like this:

````````scss
// SCSS

.element {
    @include retina {
        /* styles that will only appear on retina screen devices (minimum of 2dppx) */
    }
    @include retina(3) {
        //styles that will only appear on retina screen devices that are a minimum of 3dppx
    }
}
````````

To create this css:

````````css
/* outputted css */

@media  only screen and (min-device-pixel-ratio: 2),
        only screen and (min-resolution: 192ppi),
        only screen and (min-resolution: 2dppx) {

    .element {
        /* styles that will only appear on retina screen devices (minimum of 2dppx) */
    }
}

@media  only screen and (min-device-pixel-ratio: 3),
        only screen and (min-resolution: 288ppi),
        only screen and (min-resolution: 3dppx) {

    .element {
        /* styles that will only appear on retina screen devices that are a minimum of 3dppx */
    }
}
````````

## For contributors

If you wish to contribute to mq-scss, it now comes with a testing environment. To access the testing environment:

1. Checking out the [GitHub repository](https://github.com/Dan503/mq-scss)
2. Set a command line interface current directory to the project folder (`cd C:/path/to/folder`)
3. Run `npm install`
4. If you have never used gulp before, run `npm install gulp-cli -g`
5. Run `gulp --open`

It also comes with a batch of 46 unit tests that are used to ensure that all of the functionality remains intact. To run the unit tests:

1. Run `gulp compile-tests` (refreshes the css files it tests against)
2. Run `npm test`

## Change log

The change log has been moved to the [mq-scss GitHub releases page](https://github.com/Dan503/mq-scss/releases).
