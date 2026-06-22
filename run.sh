#!/bin/bash

# AI Video Search Engine - DevOps Wrapper Script
# Fulfills DevOps Lead Week 4 and Week 5 tasks (Single command startup & Env setup helper)

# Exit on error
set -e

# Working directory to script folder
cd "$(dirname "$0")"

# Text Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}==================================================${NC}"
echo -e "${GREEN}       AI Video Search Engine - Control Center    ${NC}"
echo -e "${BLUE}==================================================${NC}"

# Helper functions
check_env() {
    if [ ! -f .env ]; then
        echo -e "${YELLOW}[!] .env file not found. Copying default template from .env.example...${NC}"
        cp .env.example .env
        echo -e "${GREEN}[✓] .env file successfully created!${NC}"
    else
        echo -e "${GREEN}[✓] Environment configuration (.env) loaded.${NC}"
    fi
}

check_docker() {
    echo -e "${BLUE}[1/3] Verifying Docker installation & status...${NC}"
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}[✗] Error: Docker is not installed on this machine.${NC}"
        echo -e "Please install Docker Desktop: https://www.docker.com/products/docker-desktop"
        exit 1
    fi

    # Check if Docker Daemon is running
    if ! docker info &> /dev/null; then
        echo -e "${YELLOW}[!] Warning: Docker daemon is not running.${NC}"
        echo -e "Please open Docker Desktop or start the docker service and try again."
        echo -e "On macOS, run: ${GREEN}open -a Docker${NC} or wait for the application to load."
        exit 1
    fi
    echo -e "${GREEN}[✓] Docker daemon is running.${NC}"
}

run_tests() {
    echo -e "${BLUE}[*] Running local unit tests on the preprocessing pipeline...${NC}"
    if [ -f .venv/bin/pytest ]; then
        PYTHONPATH=. .venv/bin/pytest preprocessing/test_preprocessing.py
    else
        echo -e "${YELLOW}[!] Virtual environment pytest not found. Installing test dependencies...${NC}"
        python3 -m venv .venv
        .venv/bin/pip install -r preprocessing/requirements.txt
        PYTHONPATH=. .venv/bin/pytest preprocessing/test_preprocessing.py
    fi
    echo -e "${GREEN}[✓] Preprocessing test suite completed successfully!${NC}"
}

verify_compose() {
    echo -e "${BLUE}[2/3] Checking Docker Compose configuration validity...${NC}"
    docker compose config > /dev/null
    echo -e "${GREEN}[✓] Docker compose syntax and configs are valid.${NC}"
}

# Command arguments
if [ "$1" == "--test" ]; then
    run_tests
    exit 0
fi

if [ "$1" == "--down" ]; then
    echo -e "${YELLOW}[*] Tearing down Docker services...${NC}"
    docker compose down -v
    echo -e "${GREEN}[✓] Done.${NC}"
    exit 0
fi

# Default run flow
check_env
check_docker
verify_compose

if [ "$1" == "--build" ]; then
    echo -e "${BLUE}[3/3] Building and starting all services (FastAPI, Redis, Celery, Postgres, Qdrant, React)...${NC}"
    docker compose up --build
else
    echo -e "${BLUE}[3/3] Starting services via Docker Compose...${NC}"
    echo -e "${YELLOW}-> Tips: Use './run.sh --build' to force rebuild, or './run.sh --test' to run tests.${NC}"
    docker compose up
fi
