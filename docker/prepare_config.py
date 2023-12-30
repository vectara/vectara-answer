import sys
import yaml
import os

# Local implementation of simple TOML file read, to avoid requiring python toml package install
def parse_section_line(line):
    return line.strip()[1:-1]


def parse_value(value_str):
    try:
        return int(value_str)
    except ValueError:
        pass

    try:
        return float(value_str)
    except ValueError:
        pass

    if value_str.lower() == "true":
        return True
    elif value_str.lower() == "false":
        return False

    if value_str.startswith('"') and value_str.endswith('"'):
        return value_str[1:-1]

    return value_str


def read_toml_file(file_path):
    result = {}
    current_section = None

    with open(file_path, "r") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue

            if line.startswith("[") and line.endswith("]"):
                current_section = parse_section_line(line)
                result[current_section] = {}
                continue

            key, value_str = line.split("=", 1)
            key = key.strip()
            value_str = value_str.strip()

            if current_section is None:
                result[key] = parse_value(value_str)
            else:
                result[current_section][key] = parse_value(value_str)

    return result


def main(config_folder, profile):
    config = yaml.load(
        open(os.path.join(config_folder, "config.yaml")), Loader=yaml.FullLoader
    )
    if type(config) != dict:
        print(f"Illegal config file format {os.path.join(config_folder, 'config.yaml')}")
        sys.exit(1)

    config["endpoint"] = "api.vectara.io"

    # read key-value pairs from secrets.toml file
    if not os.path.exists('secrets.toml'):
        print(f"Missing secrets.toml file in {os.getcwd()}")
        sys.exit(1)

    toml = read_toml_file("secrets.toml")

    new_config = {}
    for k, v in config.items():
        new_config[k] = v
    for k, v in toml[profile].items():
        new_config[k] = v
    for k, v in toml["general"].items():
        new_config[k] = v

    with open(".env", "w") as f:
        for k in new_config.keys():
            if type(new_config[k]) == str:
                new_config[k] = new_config[k].replace("\n", "\\n")
            f.write(f"{k}={new_config[k]}\n")


if __name__ == "__main__":
    config_folder = sys.argv[1]
    profile = sys.argv[2]
    main(config_folder, profile)
