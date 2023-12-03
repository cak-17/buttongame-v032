#!/bin/bash
SHELL := /bin/bash

.PHONY: help
help: ## Show this help
		@egrep -h '\s##\s' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: backend
backend: ## Start Backend 
		node ./backend/main.js runserver

.PHONY: frontend
frontend: ## Start Frontend
		cd frontend && npm run dev

