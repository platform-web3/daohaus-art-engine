// @ts-check
'use strict';

const path = require('path');
const fs = require('fs');

// @ts-ignore
const isLocal = typeof process.pkg === 'undefined';
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);

const { Command } = require('commander');
const program = new Command();
const chalk = require('chalk');

// read json data
const rawData = fs.readFileSync(`${basePath}/build/json/_metadata.json`);

/**
 * @typedef {{ trait_type: string, value: string | number | boolean }} Attribute
 * @typedef {{ attributes: Attribute[], edition: number, [key: string]: any }} ItemMetadata
 * @type {ItemMetadata[]}
 */
const data = JSON.parse(rawData.toString());

const DIGIT_LEFT = 'Digit Left';
const DIGIT_MIDDLE = 'Digit Middle';
const DIGIT_RIGHT = 'Digit Right';

program.option('-d, --debug', 'Display debug logs').action(({ debug }) => {
  data.forEach((item) => {
    /** @type {string | undefined} */ let digitLeft = undefined;
    /** @type {string | undefined} */ let digitMiddle = undefined;
    /** @type {string | undefined} */ let digitRight = undefined;

    const filteredAttributes = item.attributes.filter((attribute) => {
      if (typeof attribute.value !== 'string') return;

      if (attribute.trait_type == DIGIT_LEFT) {
        digitLeft = attribute.value.slice(0, -1);
        return false;
      } else if (attribute.trait_type == DIGIT_MIDDLE) {
        digitMiddle = attribute.value.slice(0, -1);
        return false;
      } else if (attribute.trait_type == DIGIT_RIGHT) {
        digitRight = attribute.value.slice(0, -1);
        return false;
      }

      return true;
    });

    if (digitLeft && digitMiddle && digitRight) {
      const id = `${digitLeft}${digitMiddle}${digitRight}`;
      console.log(
        chalk.green(
          `Setting "ID" attribute for #${item.edition} with value "${id}"`,
        ),
      );
      item.attributes = [
        { trait_type: 'ID', value: id },
        ...filteredAttributes,
      ];
    } else {
      console.log(
        chalk.yellow(
          `One of the following digits is undefined for #${item.edition}:`,
        ),
        { digitLeft, digitMiddle, digitRight },
      );
      console.log(chalk.gray('Skipping...'));
    }

    fs.writeFileSync(
      `${basePath}/build/json/${item.edition}.json`,
      JSON.stringify(item, null, 2),
    );
    console.log(chalk.gray(`Saving file...\n`));
  });

  fs.writeFileSync(
    `${basePath}/build/json/_metadata.json`,
    JSON.stringify(data, null, 2),
  );
  console.log('Added "ID" attribute for all metadata files');
});

program.parse();
