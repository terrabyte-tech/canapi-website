# Terrabyte 11ty Template

The purpose of this project is to standardize the Terrabyte website development and maintenance workflow. [11ty](https://www.11ty.dev/) is a static-site generator that makes the website build process more efficient by leveraging components, site data variables, and other web dev tools. For more information on using 11ty, please read [their documentation](https://www.11ty.dev/docs/).

Below, you will find a set of instructions for getting started with 11ty, as well as how to best utilize this template in Terrabyte projects (downstream projects).

**NOTE:** Creating a website with 11ty requires Node.js and npm on your machine.

## Table of Contents

- [Initializing a downstream project](#project-initialization)
- [Changing downstream project content](#project-content)
  - [Creating a subtree](#1-create-subtree)
  - [Incorporating template](#2-incorporate-template)
  - [Dependencies](#3-install-dependencies)
  - [Adding downstream project content](#4-adding-project-content)
- [Managing updates to template](#managing-updates)

## Project Initialization

DigitalOcean has a great [guide](https://www.digitalocean.com/community/tutorials/how-to-create-and-deploy-your-first-eleventy-website#step-2-choosing-a-templating-language) on building your first 11ty website. This guide will use their steps while adapting it to this template.

### 1. Create repo & checkout

Create a project repository in GitHub as per-norm. Initialize within GitHub by adding a README, and check it out to your local device through the GitHub CLI (or using terminal commands if you're a nerd ;).

### 2. Initialize project

Within the repo's root folder, run the following commands to create a new Node.js project...

```
npm init -y
```

...and install 11ty as a dependency.

```
npm install -D @11ty/eleventy
```

### 3. (Optional) package.json

Optionally, you can add the following scripts to the newly-created `package.json` file to make development easier. Replace the existing `scripts{}` object with the following `scripts{}` object:

```
...
  "scripts": {
    "build": "eleventy",
    "start": "eleventy --serve"
  },
...
```

After saving the `package.json` file, run the following command to build the project for the first time.

```
npm run build
``` 

## Project Content

Now that the 11ty project bones are in place, it's time to implement the `terrabyte-11ty-starter` (boilerplate) and the `terrabyte-11ty-template` (this template). The two can be distinguished by thinking of the boilerplate as a launch point, and the template as shared UI/Component pieces. There may be some shared elements between the two as the file is required no matter if the template is implemented or not.

### 1. Implement Boilerplate

The starter repo is perfect for dropping in the files and components used to build a Terrabyte website. Fetching this content can either be done by simply copy/pasting the repo content, or by creating a subtree. For more information on this starter package, you can view the `terrabyte-11ty-starter` repo on [GitHub](https://github.com/terrabyte-tech/terrabyte-11ty-starter).

### 2. Create Template Subtree

By adding this template to a project folder, you are able to bring template updates into your project without disturbing your code additions later (as long as you diff right). We recommend putting the subtree in a root folder, `/template`. 

First, make sure all changes are committed to your branch. Then, create the subtree:

```
// define remote repo
git remote add template-remote https://github.com/terrabyte-tech/terrabyte-11ty-template.git
git fetch template-remote

// ...then add the subtree from remote
git subtree add --prefix=template template-remote main
```

### 3. Incorporate Template

If you are starting a new project, you can simply copy all of the content from the `/template` folder into the root.

Caveats that _should not_ be copied include:

- `.git`: This is THIS project's git history - you'll make your own in your new project.
- `.github/workflows/notify-downstream.yml`: This is automation for triggering the update process for projects that use this template. So, let's not create a blackhole by looping through automations that trigger themselves...
- `_site`: This is the web-ready content rendered by the 11ty build process. It will be rendered in your new project as well.
- `node_modules`: This is a folder containing node-specific files. These won't be committed in GitHub nor should they be copied from project to project (use npm for this).
- `package.json` and `package-lock.json`: You just changed the `package.json` file, no need to overwrite it!
- `README.md`: Your new project requires it's own README :)

### 4. Install dependencies

Before building the project again, you will need to install dependencies referenced in the template project. This includes:

#### Cheerio

Cheerio is used to create accessibility table of contents per-page (via the `.eleventy.js` file). To install the dependency, run the following command.

```
npm install cheerio
``` 

### 5. Adding project content

At this point, you should be ready to build your website as you intend. This can include building components, pages, and other files. 


#### `site.json`

This data file should be leveraged for changing site details, information, and other metadata. For a detailed set of data that can be in this file, see [/_data/site.bak.jsonc](./_data/site.bak.jsonc).

## Managing Updates

### General

Whether you are dropping in content from an old project (converting to 11ty) or starting fresh, don't forget to:

Run the build process after making changes to `.eleventy.js` or other build files.

```
npm run build
```

And run the local server in order to preview changes as you make them to site files.

```
npm run start
``` 

### Updating Template

As long as this repo is added to the template's `notify-downstream.yml` file, the template within the `/template` folder should _always_ be synced with the latest release of the template. For setup instructions, caveats, and maintenance tips, see the [workflow documentation](.github/workflows/README.md). Otherwise, you can manually update the subtree in the `/template` folder by running the following commands:

```
// fetch the remote
git fetch template-remote

// pull remote into /template
git subtree pull --prefix=template template-remote main
```

#### Version History

As the template changes, so does the documented version. In order to manage what version you are on and what the latest is, template version is stored in the `package.json` file here, as well as in `site.json` for projects that leverage it. To get the most out of this template, we suggest keeping an updated subtree. For more detailed information on releases, please see the Git activity.

- v1.0.0: Initial release
- v1.1.x: Added styleType logic, fontFamily support 
- v1.2.x: Added downstream automation, component utilization, implementation documentation
- v1.3.x: Added global styles, pixel styles, and Canapi styles
- v1.4.x: Split repo into Template and Starter (boilerplate)