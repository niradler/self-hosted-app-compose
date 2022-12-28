import inquirer from "inquirer";
import Apps from "../lib/apps.js";

export default function (parentCommand) {
  parentCommand
    .command(
      "logs",
      "stop containers",
      (yargs) => {
        return yargs
          .option("rootDir", {
            default: process.cwd(),
            description: "apps root directory",
          })
          .option("services", {
            type: "array",
            description: "services names",
          })
          .option("name", {
            description: "app name",
            required: true,
          });
      },
      async (argv) => {
        if (argv.verbose) console.debug(argv);

        const apps = new Apps(argv);
        await apps.runCompose({
          name: argv.name,
          fn: "logs",
          args: [],
        });
      }
    )
    .command(
      "ps",
      "list containers",
      (yargs) => {
        return yargs
          .option("rootDir", {
            default: process.cwd(),
            description: "apps root directory",
          })
          .option("name", {
            description: "app name",
            required: true,
          });
      },
      async (argv) => {
        if (argv.verbose) console.debug(argv);

        const apps = new Apps(argv);
        await apps.runCompose({
          name: argv.name,
          fn: "ps",
          args: [],
        });
      }
    )
    .command(
      "down",
      "stop containers",
      (yargs) => {
        return yargs
          .option("rootDir", {
            default: process.cwd(),
            description: "apps root directory",
          })
          .option("name", {
            description: "app name",
            required: true,
          });
      },
      async (argv) => {
        if (argv.verbose) console.debug(argv);

        const apps = new Apps(argv);
        await apps.runCompose({
          name: argv.name,
          fn: "down",
          args: [],
        });
      }
    )
    .command(
      "up",
      "start containers",
      (yargs) => {
        return yargs
          .option("rootDir", {
            default: process.cwd(),
            description: "apps root directory",
          })
          .option("name", {
            description: "app name",
            required: true,
          });
      },
      async (argv) => {
        if (argv.verbose) console.debug(argv);

        const apps = new Apps(argv);
        await apps.runCompose({
          name: argv.name,
          fn: "upAll",
          args: [],
        });
      }
    )
    .command(
      "restart",
      "restart app",
      (yargs) => {
        return yargs
          .option("rootDir", {
            default: process.cwd(),
            description: "apps root directory",
          })

          .option("name", {
            description: "app name",
            required: true,
          });
      },
      async (argv) => {
        if (argv.verbose) console.debug(argv);

        const apps = new Apps(argv);
        await apps.runCompose({
          name: argv.name,
          fn: "restartAll",
          args: [],
        });
      }
    )
    .command(
      "run",
      "run command",
      (yargs) => {
        return yargs
          .option("rootDir", {
            default: process.cwd(),
            description: "apps root directory",
          })
          .option("service", {
            description: "service name",
            required: true,
          })
          .option("cmd", {
            description: "command to run",
            required: true,
          })
          .option("name", {
            description: "app name",
            required: true,
          });
      },
      async (argv) => {
        if (argv.verbose) console.debug(argv);

        const apps = new Apps(argv);
        await apps.runCompose({
          name: argv.name,
          fn: "run",
          args: [argv.service, argv.cmd],
        });
      }
    )
    .command(
      "stop",
      "stop app",
      (yargs) => {
        return yargs
          .option("rootDir", {
            default: process.cwd(),
            description: "apps root directory",
          })
          .option("name", {
            description: "app name",
            required: true,
          });
      },
      async (argv) => {
        if (argv.verbose) console.debug(argv);

        const apps = new Apps(argv);
        await apps.runCompose({
          name: argv.name,
          fn: "stop",
          args: [],
        });
      }
    )
    .command(
      "exec",
      "manage apps",
      (yargs) => {
        return yargs
          .option("rootDir", {
            default: process.cwd(),
            description: "apps root directory",
          })
          .option("name", {
            description: "app name",
            required: true,
          })
          .option("service", {
            description: "service name",
            required: true,
          })
          .option("cmd", {
            description: "command to run",
            required: true,
          });
      },
      async (argv) => {
        if (argv.verbose) console.debug(argv);

        const apps = new Apps(argv);
        await apps.runCompose({
          name: argv.name,
          fn: "exec",
          args: [argv.service, argv.cmd],
        });
      }
    )
    .command(
      "list",
      "list services",
      (yargs) => {
        return yargs
          .option("rootDir", {
            default: process.cwd(),
            description: "apps root directory",
          })
          .option("name", {
            description: "app name",
            required: true,
          });
      },
      async (argv) => {
        if (argv.verbose) console.debug(argv);

        const apps = new Apps(argv);

        await apps.runCompose({
          name: argv.name,
          fn: "configServices",
          args: [],
        });
      }
    )
    .command(
      "pull",
      "pull app images",
      (yargs) => {
        return yargs
          .option("rootDir", {
            default: process.cwd(),
            description: "apps root directory",
          })
          .option("name", {
            description: "app name",
            required: true,
          });
      },
      async (argv) => {
        if (argv.verbose) console.debug(argv);

        const apps = new Apps(argv);

        await apps.runCompose({
          name: argv.name,
          fn: "pullAll",
          args: [],
        });
      }
    )
    .command(
      "upgrade",
      "upgrade app",
      (yargs) => {
        return yargs
          .option("rootDir", {
            default: process.cwd(),
            description: "apps root directory",
          })
          .option("name", {
            description: "app name",
            required: true,
          });
      },
      async (argv) => {
        if (argv.verbose) console.debug(argv);

        const apps = new Apps(argv);
        await apps.runCompose({
          name: argv.name,
          fn: "stop",
          args: [],
        });
        await apps.runCompose({
          name: argv.name,
          fn: "pullAll",
          args: [],
        });
        await apps.runCompose(
          {
            name: argv.name,
            fn: "up",
            args: [],
          },
          {
            composeOptions: ["--force-recreate"],
          }
        );
      }
    )
    .command(
      "remove",
      "remove app",
      (yargs) => {
        return yargs
          .option("rootDir", {
            default: process.cwd(),
            description: "apps root directory",
          })
          .option("name", {
            description: "app name",
            required: true,
          });
      },
      async (argv) => {
        if (argv.verbose) console.debug(argv);

        const apps = new Apps(argv);
        await apps.remove(argv);
      }
    )
    .command(
      "create",
      "create app",
      (yargs) => {
        return yargs
          .option("rootDir", {
            default: process.cwd(),
            description: "apps root directory",
          })
          .option("configType", {
            default: "yaml",
            description: "yaml/yml/json",
          })
          .option("composeOptions", {
            type: "array",
            default: [],
            description: "compose options",
          })
          .option("name", {
            description: "app name",
            required: true,
          });
      },
      async (argv) => {
        if (argv.verbose) console.debug(argv);

        const apps = new Apps(argv);

        const { config } = await inquirer.prompt([
          {
            name: "config",
            type: "editor",
            message: "docker compose config",
          },
        ]);

        await apps.create({
          composeOptions: argv.composeOptions,
          configType: argv.configType,
          config: config,
          name: argv.name,
          env: await getEnv(),
        });
      }
    );
}