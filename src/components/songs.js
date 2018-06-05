import React, { Component } from 'react';
import arrow from '../img/arrowfull.svg';
import dots from '../img/dots.svg';
import download from '../img/download.svg';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUrls } from '../actions/homeActions';

export class Songs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            songName: window.location.pathname.split( '/' )[2]
        }
    }
    componentDidMount() {
      if(this.state.songName !== undefined && this.state.songName !== null && this.state.songName !== 'Songs'){
        const url = 'https://api.gaana.com/index.php?type=song&subtype=song_detail&seokey='+this.state.songName;
        this.getSongData(url);
      } else{
        this.getSongsData();
        }
    }
    getSongsData() {
        axios('http://apiportalx.gaana.com/home/trending/songs?userlanguage=Hindi', {
            method: 'GET',
            headers: {
                // 'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                //console.log(response.data.entities);
                return response.data.entities;
            }).then(data => {
                this.setState({ data: data.slice(0, 29) });
            });
    }
    getSongData(url) {
        axios(url, {
            method: 'GET',
            headers: {
                // 'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                //console.log(response.data.entities);
                return response.data.tracks;
                console.log(response.data.tracks);
            }).then(data => {
                this.setState({ data: data });
                this.getIdsAuto(data[0].track_id, data[0].track_title);
            });
    }
    getIdsAuto(id,title){
      this.props.getUrls(id, title).then(url => {
        if (window.getMobileOperatingSystem() === "Android") {
          window.getSongs(title, url, id);
        } else {
          window.getSongsIOS(url);
        }
      });
    }
    render() {
        console.log('Trending Data view ALl : ', this.state.data);
        const dataEmpty = [0, 1, 2, 3, 4, 5];
        const TDataEmprty = dataEmpty.map(function (value, key) {
            return <ul id="trackrow" className="s_list artworkload"><li className="clearfix list loaded" data-value="song"><div className="lt_col"><div className="at_img"><img className="opacity img" data-value="song" data-type="touch-play" src="http://a10.gaanacdn.com/images/gaanawebsite/albumdefaultcommonv1.jpg" title="Loading " alt="Loading " /></div></div><div className="rt_col"><div className="info_text"><span className="s_name ">Loading</span><span className="s_album"><a title="Loading ">Loading </a><a title="Loading">Loading</a></span></div><a className="s_ic s_ic1" data-icon="more_H"><img src="/static/media/dots.6ddf03e4.svg" alt="" /></a><a className="s_ic s_ic2" data-icon="download"><img src="/static/media/download.ee615d3f.svg" alt="" /></a></div></li></ul>;
        });
        const data = this.state.data;
        console.log(this.state.songName,'song');
        let TData = '';
        if(this.state.songName){
         TData = Object.keys(data).map(key =>
              <ul id={"trackrow" + data[key].track_id} className="s_list artworkload ">
                  <li className="clearfix list loaded" data-value={"song" + data[key].track_id}>
                      <div className="lt_col" onClick={this.getIdsAuto.bind(this, data[key].track_id, data[key].track_title)}>
                          <div className="at_img">
                              <img className="opacity img" data-value={"song" + data[key].track_id} data-type="touch-play" src={data[key].artwork} title={data[key].track_title} alt={data[key].track_title} />
                          </div>
                      </div>
                      <div className="rt_col">
                          <div className="info_text" onClick={this.getIdsAuto.bind(this, data[key].track_id, data[key].track_title)}>
                              <span className="s_name ">{data[key].track_title}</span>
                              <span className="s_album">
                                  <a title={data[key].track_title}>{data[key].track_title}</a> ,  <a title={data[key].track_title}>{data[key].album_title}</a>
                              </span>
                          </div>
                          <a className="s_ic s_ic1" data-icon="more_H"><img src={dots} alt="" /></a>
                          <a className="s_ic s_ic2" data-icon="download"><img src={download} alt="" /></a>
                      </div>
                  </li>
              </ul>
          )
        } else {
         TData = Object.keys(data).map(key =>
              <ul id={"trackrow" + data[key].entity_id} className="s_list artworkload ">
                  <li className="clearfix list loaded" data-value={"song" + data[key].entity_id}>
                      <div className="lt_col" onClick={this.getIdsAuto.bind(this, data[key].entity_id, data[key].name)}>
                          <div className="at_img">
                              <img className="opacity img" data-value={"song" + data[key].entity_id} data-type="touch-play" src={data[key].artwork} title={data[key].name} alt={data[key].name} />
                          </div>
                      </div>
                      <div className="rt_col">
                          <div className="info_text" onClick={this.getIdsAuto.bind(this, data[key].entity_id, data[key].name)}>
                              <span className="s_name ">{data[key].name}</span>
                              <span className="s_album">
                                  <a title={data[key].name}>{data[key].name}</a> ,  <a title={data[key].name}>{data[key].entity_info[1].value[0].name}</a>
                              </span>
                          </div>
                          <a className="s_ic s_ic1" data-icon="more_H"><img src={dots} alt="" /></a>
                          <a className="s_ic s_ic2" data-icon="download"><img src={download} alt="" /></a>
                      </div>
                  </li>
              </ul>
          )
        }
        return (
            <div className="main">
                <section className="trendingbox mainRec ">
                    <div className="blurimg">
                        <div className="bluroverlay"></div>
                        <img className="img" src="https://css375.gaanacdn.com/images/gaana_ads_bg.jpg" alt="" />
                    </div>{console.log(this.state.data[0])}
                    <h2 className="trendingtitle">{this.state.songName ? this.state.data.album_title : 'Trending Songs'}</h2>
                    <div className="de_info">
                        <p className="s_count">{this.state.data.length + '  Songs'}</p>
                        <a className="button_ic red_btn" data-icon="playBtn" data-type="playall" title="Play All" data-value="">{this.state.songName ? 'PLAY' : 'PLAY ALL'}<img src={arrow} alt="" /></a>
                    </div>
                </section>
                <section className="playlist_q clearfix" id="sub-content-container">
                    {this.state.data ? TData : TDataEmprty}
                </section>
            </div>
        );
    }
}
Songs.propTypes = {
  getUrls: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    data: state.homeReducer.topTrendingSongs
  }
}

export default connect(mapStateToProps, { getUrls })(Songs);
