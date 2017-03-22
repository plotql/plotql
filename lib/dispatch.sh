#!/bin/bash

set -e
set -u
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
mongo < $DIR/dispatch.js
