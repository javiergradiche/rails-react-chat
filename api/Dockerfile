# FROM ruby:2.6.5-alpine AS base

# RUN apk add --no-cache --update build-base \
#                                 git \
#                                 postgresql-dev \
#                                 nodejs \
#                                 tzdata

# RUN mkdir /app
# WORKDIR /app

# ADD Gemfile /app/Gemfile
# ADD Gemfile.lock /app/Gemfile.lock
# RUN gem install bundler -v 2.1.4
# RUN bundle install --without development test --deployment


# ADD . /app
# RUN pwd
# RUN ls -lta

# EXPOSE 3000

# CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]

FROM ruby:2.6.5

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs yarn ghostscript

RUN mkdir -p /app
RUN mkdir -p /usr/local/nvm
WORKDIR /app

RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs

RUN node -v
RUN npm -v

# Copy the Gemfile as well as the Gemfile.lock and install
# the RubyGems. This is a separate step so the dependencies
# will be cached unless changes to one of those two files
# are made.
# COPY Gemfile Gemfile.lock package.json yarn.lock ./
COPY Gemfile Gemfile.lock /app/
RUN gem install bundler -v 2.1.4
RUN bundle install --verbose --jobs 20 --retry 5

# RUN npm install -g yarn
# RUN yarn install --check-files

# Copy the main application.
COPY . /app

# Expose port 3000 to the Docker host, so we can access it
# from the outside.
EXPOSE 3000

# The main command to run when the container starts. Also
# tell the Rails dev server to bind to all interfaces by
# default.
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]