import React from 'react'
import { render } from 'react-dom'
import LatestBadges from './latest-badges/index.jsx'

// dynamicly create the app root before the script tag
const appRoot = document.currentScript.parentNode.insertBefore(
                    document.createElement('div'),
                    document.currentScript)

const args = document.currentScript.dataset

switch (args.type) {
  case 'latest-badges':
    render(<LatestBadges issuerId={args.issuerId} />, appRoot)
    break
  default:
    console.error(Error(`[credly widget] Unknown type ${args.type}`))
}
