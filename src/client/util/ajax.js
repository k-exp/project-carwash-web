
import common from 'jsCommon'
import $ from 'jquery';


const promise = common.util.promise;


export function optionsJsonAsync(url) {
  return Promise.resolve($.ajax({
    url: url,
    dataType: 'JSON',
    type: 'OPTIONS'
  }));
}


export function getJsonAsync(url) {
  return Promise.resolve($.ajax({
    url: url,
    dataType: 'JSON',
    type: 'GET'
  }));
}


export function getJsonNoCacheAsync(url) {
  return Promise.resolve($.ajax({
    url: url,
    dataType: 'JSON',
    cache: false,
    type: 'GET'
  }));
}


export function postJsonAsync(url, data) {
  return Promise.resolve($.ajax({
    url: url,
    dataType: 'JSON',
    type: 'POST',
    data: data
  }));
}
