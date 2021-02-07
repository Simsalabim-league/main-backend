/**
 * System agnostic tool for deleting files
 * Node version >= v14.14.0
 */

const { rmSync } = require('fs')

if (process.argv.length < 3)
{
    console.error('Should provide name of file to delete')
    process.exit(1)
}

process.argv.slice(2).forEach(fileToDelete => rmSync(fileToDelete, { recursive: true, force: true }))
