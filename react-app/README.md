# Gitnation React App Layer

React App for GitNation conferences

## TODO on moving to separate package:

1. change main from 'src' to 'dist'

2. in projects:
   1. yarn build:mixins
   2. copy mixins/eventsBus.njk to templates/react-app/eventsBus/njk
   3. inject `initEventsLayer` into _layout.html
