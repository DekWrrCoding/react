import _ from 'lodash';
import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar'; //in case have a lot search_bar.js :D so we can know which one
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import BodyBackgroundColor from 'react-body-backgroundcolor';

const API_KEY = 'AIzaSyBV1t2a0NOaWjnsqGKDGB-Y75woVN9yjdc';



class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            videos : [],
            selectedVideo: null
        };
        this.videoSearch('Melancholic');
        
    }
    videoSearch(term) {
        YTSearch({key: API_KEY , term: term}, (pang) => {
            this.setState({
                videos : pang,
                selectedVideo : pang[0]
            });
        });
    }
    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) },1000);

        return (
            <BodyBackgroundColor backgroundColor='#ffe6e6'>
            <div>
            <SearchBar onSearchTermChange={videoSearch}/>
            <VideoDetail video={this.state.selectedVideo}/>
            <VideoList 
                onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
                pang={this.state.videos} />
        </div>  
      </BodyBackgroundColor>
        );
    }

   

    
}
ReactDOM.render(<App />, document.querySelector('.container'));