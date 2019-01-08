require 'sinatra'
require 'httparty'

configure do
    set :events_api, ENV["EVENTS_API"] || "http://localhost:8081"
    puts "Events API: #{settings.events_api}"
end

get '/' do
    content_type "text/html"
    File.open("index.html", 'rb', &:read)
end

get '/events' do
    content_type 'text/json'
    puts "Requesting #{settings.events_api}"
    response = HTTParty.post(settings.events_api, :headers => {'Content-Type' => 'text/plain'}, :body => "events")
    return response.body
end

get '/favicon.ico' do
    status 404
end

get '/*' do
    case request.path.split(".").last
    when "css"
        content_type "text/css"
    when "js"
        content_type "text/javascript"
    when "png"
        content_type "image/png"
    else
        content_type "text/html"
    end

    body = File.open(".#{request.path}", 'rb', &:read)
    return body
end