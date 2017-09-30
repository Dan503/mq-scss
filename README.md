# mq-scss

An extremely powerful but easy to use Sass media query mixin

This media query mixin is a powerful tool that lets you easily create far more complex media queries than you would have ever attempted to do with plain css. It also makes your code far easier to maintain through it's ability to take simple media query variables.

If you enjoy using mq-scss, try my new [mq-js](https://www.npmjs.com/package/mq-js) npm module. This allows you to use mq-scss style media queries inside your JavaScript files.

## Contents

* [Installation](#installation)
* [Basic usage](#basic-usage)
    * [Min/Max width](#minmax-width)
        * [Min/Max width long hand](#minmax-width-long-hand)
    * [Inside/Outside](#insideoutside)
        * [Changing which value comes first](#changing-which-value-comes-first)
    * [Ratio based media queries](#ratio-based-media-queries)
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
    * [Media query `or` statements](#media-query-or-statements)
    * [Media Query `plus` statements](#media-query-plus-statements)
        * [**!IMPORTANT!** limitations of `plus`](#important-limitations-of-plus)
* [em conversion](#em-conversion)
* [Defining breakpoints](#defining-breakpoints)
* [Bonus retina display mixin](#bonus-retina-display-mixin)
* [Change Log](#change-log)

## Installation

```````````
npm install mq-scss --save
```````````

Import mq-scss at the top of your main Sass file (note that the exact path will differ depending on your folder structure)

``````scss
@import "../node_modules/mq-scss/mq";
``````

## Basic usage

``````scss
@include mq($range, $breakpoint-1 [, $breakpoint-2]){ @content }
``````

### Min/Max width

In this example we state that we want the background of the element to be red by default but change to blue if the screen is less than or equal to 600px wide

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

@media screen and (max-width: 600px) {
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

@media screen and (min-width: 601px) {
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
@media screen and (min-width: 801px) {
  .element {
    background: blue;
  }
}
@media screen and (max-width: 600px) {
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

@media screen and (max-width: 1024px) and (min-width: 601px) {
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

@media screen and (max-width: 600px), screen and (min-width: 1025px) {
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
@media screen and (max-width: 1024px) and (min-width: 601px) {
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

@media screen and (min-aspect-ratio: 2 / 1) {
    .element { background: blue; }
}
`````````````

It is easiest to think of ratio based media queries as always being based more on the width than the height. For example, `mq('min-ratio', '2 / 1')` will be active at a ratio of `3 / 1` but not at a ratio of `1 / 1` or `2 / 3`. `min-ratio` acts a little bit like `min-width` in this sense. Since `3 / 1` is wider than `2 / 1` it will be active but both `1 / 1` and `2 / 3` are thinner than `2 / 1` so those are not active.

There are 2 types of ratio based media queries, "aspect-ratio" (shortened to just `ratio` in the mq mixin) and "device-aspect-ratio" (shortened to `device-ratio` in the mq mixin). It is generally best to stick with "aspect-ratio" rather than "device-aspect-ratio" since "aspect-ratio" is determined by the users browser window size. "device-aspect-ratio" is based on the physical screen size of the users device. With "aspect-ratio" you can see the effects by just resizing the browser window. With "device-aspect-ratio" you will physically have to look at the site on a different screen in order to see the effect... or look at the site with the Chrome dev tools screen emulator open (Chromes screen emulator obeys "device-aspect-ratio" media queries).

Ratio based media queries are mostly useful for when you have sites that have displays that take up the full screen. Displays like this tend to need media queries that understand both the users screen height and width at the same time. You may need to combine the ratio based media query with a more traditional pixel based media query for it to have the greatest effect. Read the [Media Query `plus` statements](#media-query-plus-statements) section for more details on how to do that.

### Full list of media query ranges

    @include mq([range], XXX, YYY){ /*styles*/ }

These examples are based on XXX being a larger value than YYY.

Note that orientation and ratio ranges do **not** accept pixel values.

Also, `orientation` only accepts the strings `'portrait'` and `'landscape'`.

#### Single value ranges

- **min** : `screen and (min-width: XXX)`
- **max** : `screen and (max-width: XXX)`

- **min-width** : (same as `min`)
- **max-width** : (same as `max`)

- **min-height** : `screen and (min-height: XXX)`
- **max-height** : `screen and (max-height: XXX)`

- **ratio** : `screen and (aspect-ratio: XXX)`
- **min-ratio** : `screen and (min-aspect-ratio: XXX)`
- **max-ratio** : `screen and (max-aspect-ratio: XXX)`

- **device-ratio** : `screen and (device-aspect-ratio: XXX)`
- **min-device-ratio** : `screen and (min-device-aspect-ratio: XXX)`
- **max-device-ratio** : `screen and (max-device-aspect-ratio: XXX)`

- **orientation** : `screen and (orientation: XXX)`

#### Double value ranges

- **inside** : `screen and (max-width: XXX) and (min-width: YYY)`
- **outside** : `screen and (max-width: YYY), screen and (min-width: XXX)`

- **inside-width** : (same as `inside`)
- **outside-width** : (same as `outside`)

- **inside-height** : `screen and (max-height: XXX) and (min-height: YYY)`
- **outside-height** : `screen and (max-height: YYY), screen and (min-height: XXX)`

- **inside-ratio** : `screen and (max-aspect-ratio: XXX) and (min-aspect-ratio: YYY)`
- **outside-ratio** : `screen and (max-aspect-ratio: YYY), screen and (min-aspect-ratio: XXX)`

- **inside-device-ratio** : `screen and (max-device-aspect-ratio: XXX) and (min-device-aspect-ratio: YYY)`
- **outside-device-ratio** : `screen and (max-device-aspect-ratio: YYY), screen and (min-device-aspect-ratio: XXX)`


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

**$MQ** - MQ at the start tells us that it's a media query variable (helps when scanning through the code)

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

@media not screen and (max-width: 1024px) and (min-width: 601px) {
    .module__element { background: red; }
}

@media screen and (max-width: 1024px) and (min-width: 601px) {
    .module__element { background: blue; }
}

@media not screen and (max-width: 1024px) and (min-width: 601px) {
    .module__element--green { background: green; }
}

@media screen and (max-width: 1024px) and (min-width: 601px) {
    .module__element--green { background: grey; }
}
`````````````

Ahhhhh!!! It's doubling up on Media queries!!! Think of all that extra weight you're adding!!!

Well actually after gzipping, all the repetitive media query declarations [become quite negligible](https://benfrain.com/inline-or-combined-media-queries-in-sass-fight/).

## Combining media queries

### Media query `or` statements

Media Query `or` statements are only possible using an MQ variable.

`````````````scss
// SCSS

$MQ-element__color--alt:
    (inside, 1024px, 980px),
    (max, 600px)
;

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

@media screen and (max-width: 1024px) and (min-width: 981px), screen and (max-width: 600px) {
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

@media screen and (max-width: 1024px) and (min-width: 981px), screen and (max-width: 600px) {
    .element { background: blue; }
}

@media screen and (min-width: 1025px), screen and (max-width: 980px) and (min-width: 601px) {
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

@media screen and (max-width: 600px) {
  .module__sideBar {
    width: 100%;
  }
}

@media screen and (max-width: 800px) and (min-width: 401px) {
  .module__subHeading {
    display: none;
  }
}

@media screen and (min-aspect-ratio: 2 / 1) and (max-width: 800px) and (min-width: 401px), screen and (max-width: 600px) {
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

@media screen and (max-width: 800px) and (min-width: 401px) and (max-width: 600px) and (min-aspect-ratio: 2 / 1) {
  .module {
    background: red;
  }
}
`````````````

### !IMPORTANT! limitations of `plus`

You should note that `plus` does not work in all situations. There are some restrictions around using the `plus` keyword that you should be aware of.

#### It can not be used in conjunction with any `outside` range type

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

#### `plus` statements can not contain any `or` statements

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


#### Work arounds

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

@media screen and (max-width: 400px) and (max-width: 600px), screen and (min-width: 801px) and (max-width: 600px) {
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

@media screen and (max-width: 400px) and (max-width: 600px), screen and (min-width: 801px) and (max-width: 600px) {
  .module {
    background: red;
  }
}
`````````````

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

## Change log

This change log only covers major changes to the mixin. Due to how npm works, things like edits to the readme file require releasing whole new versions of the module to publish the edits. Those sorts of releases are not listed here.

### v1.3.2

- Made `inside-width` and `outside-width` valid range types that can be used instead of `inside` and `outside`.

### v1.3.1

- Made `min-width` and `max-width` valid range types that can be used instead of `min` and `max`.

### v1.3.0

- Added the `plus` keyword for improved handling of "and" statements
- Changed the breakpoints list example to just a list of variables

### v1.2.0

- Removed the need for the `$mq-largest-first` variable. You can now state double value breakpoint values in any order.
- Outside range types can now be safely nested and take advantage of the Sass nested media queries functionality.
- Updated the MQ variable syntax to what I currently use.

### v1.1.0

- Added the ability to state the smaller value first by setting an `$mq-largest-first` variable to `false`.
