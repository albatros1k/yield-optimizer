# Odysea

## Adding a Strategy

To introduce a new strategy, you must provide the configuration. The configuration is located at `config/vault/{chain}` and should include the following fields:

- **Protocols:** These are the protocols that play a role in the strategy. They are primarily for display purposes.

- **Revenue:** These keys correspond to the types of risks and MUST align with the keys described in `config/revenue` `REVENUE`.

- **Risks:** These keys correspond to the types of risks and MUST align with the keys described in `config/risks` `POTENTIAL_RISKS`.

- **About:** This section should include a brief and comprehensive description of the strategy, along with the necessary steps to configure it. This information is located at `config/about` `ABOUT`.

### `checkVaults` Function

The `checkVaults` function is designed to check the completeness and integrity of data required for any strategy within the Odysea application. It validates various aspects of each strategy, ensuring that all necessary information is available. If any crucial data is missing or incomplete, the function will raise an error.

The validation checks include:

- Availability of key information such as "ABOUT," "MECHANICS," "AUDITS," "BACKERS," and "SAFETY_SCORE" for each strategy.
- The presence and completeness of "RISKS" and "REVENUE" data based on predefined templates.

## Modal Window Information

For details pertaining to modal windows, navigate to `config/modals/{nameOfModal}`. It is imperative that you complete this information for all `vaultId`.

Maintain consistency in the Odysea application by adhering to the prescribed structure and guidelines for adding strategies and configuring modal windows.


## Quickstart

`yarn start` - start the app in development mode - you may have to disable adblock for 127.0.0.1 if you get a white screen due to ADX.png

`yarn tsc-watch` - checks types as you develop - you may not need this if your IDE does it for you

`yarn validate` - validates vault config files

`yarn build-only` - checks types and builds the app for production

`yarn build` - performs validate then build

`yarn preview` - start the app in production mode (after building)

Please ensure `yarn build` completes successfully before submitting a PR. 

## Contribute

Beefy.com exists thanks to its contributors. There are many ways you can participate and help build high quality software. Check out the [contribution guide](CONTRIBUTING.md)!

## License

[MIT](LICENSE)
