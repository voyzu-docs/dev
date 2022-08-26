# Voyzu Shared Contacts Manager Help

## About

This repository hosts the online help for Voyzu Shared Contacts Manager.  If you notice an error please raise an issue in this repository's issues.

## Technical info

This help is hosted by github pages (which is built on [jekyll](https://jekyllrb.com/) static site genration) and uses a remote theme, [minimal mistakes](https://github.com/mmistakes/minimal-mistakes).  This can be seen by opening the `_config.yml` file which contains the line:
```yaml
remote_theme: mmistakes/minimal-mistakes
```

Content is written in markdown (technically [kramdown](https://kramdown.gettalong.org)) which the jekyll build engine transforms to html after any commit.  The navigation and templating is provided by the minimal mistakes template, which builds on standard jekyll functionality, which in turn builds on shopify's open source templating language [liquid](https://shopify.github.io/liquid/)

At build time (i.e. after every committ) github pages will look for the applicable page in this repository, if this is not found it will look in the minimal mistakes remote theme repository.  For example - most pages (`/docs/_pages`) specify the layout `single` in their page front matter.  At build time the Jekyll engine will look for a layout named "single" in the `_layouts` folder.  If it doesn't find one it uses the [minimal mistakes layout](https://github.com/mmistakes/minimal-mistakes/blob/master/_layouts/single.html) 

A few minimal mistakes files have been ported into this repository, so they could be modified to give functionality that the minimal mistakes tempalte did not provide out of the box. In most cases this is to allow for very minor customization, for example deleting the final footer line, removing top link text in the masthead etc.  Where files have been modified there is generally some sort of commenting at the top of the file describing what has changed.

Note also that:
- `/assets/js/lunr/lunr-store.js` has been modified to support searching pages (not blog posts)
- `/assets/css/main.scss` has been modified to make some tweaks to text size and link onHover behaviour
