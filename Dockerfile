FROM ruby:2.5.3

ADD . /geoquake
WORKDIR /geoquake
RUN bundle config mirror.https://rubygems.org https://gems.ruby-china.com && bundle install

ENV PORT 8080

ENTRYPOINT ["bundle", "exec", "ruby", "app.rb"]

EXPOSE 8080
