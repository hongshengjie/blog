/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./blog_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.BlogClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.BlogPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.BlogIndexReq,
 *   !proto.BlogIndexResp>}
 */
const methodInfo_Blog_Index = new grpc.web.AbstractClientBase.MethodInfo(
  proto.BlogIndexResp,
  /** @param {!proto.BlogIndexReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.BlogIndexResp.deserializeBinary
);


/**
 * @param {!proto.BlogIndexReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.BlogIndexResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.BlogIndexResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.BlogClient.prototype.index =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/Blog/Index',
      request,
      metadata || {},
      methodInfo_Blog_Index,
      callback);
};


/**
 * @param {!proto.BlogIndexReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.BlogIndexResp>}
 *     A native promise that resolves to the response
 */
proto.BlogPromiseClient.prototype.index =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/Blog/Index',
      request,
      metadata || {},
      methodInfo_Blog_Index);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.BlogArticleReq,
 *   !proto.BlogArticleResp>}
 */
const methodInfo_Blog_Article = new grpc.web.AbstractClientBase.MethodInfo(
  proto.BlogArticleResp,
  /** @param {!proto.BlogArticleReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.BlogArticleResp.deserializeBinary
);


/**
 * @param {!proto.BlogArticleReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.BlogArticleResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.BlogArticleResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.BlogClient.prototype.article =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/Blog/Article',
      request,
      metadata || {},
      methodInfo_Blog_Article,
      callback);
};


/**
 * @param {!proto.BlogArticleReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.BlogArticleResp>}
 *     A native promise that resolves to the response
 */
proto.BlogPromiseClient.prototype.article =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/Blog/Article',
      request,
      metadata || {},
      methodInfo_Blog_Article);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.BlogListReq,
 *   !proto.BlogListResp>}
 */
const methodInfo_Blog_List = new grpc.web.AbstractClientBase.MethodInfo(
  proto.BlogListResp,
  /** @param {!proto.BlogListReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.BlogListResp.deserializeBinary
);


/**
 * @param {!proto.BlogListReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.BlogListResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.BlogListResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.BlogClient.prototype.list =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/Blog/List',
      request,
      metadata || {},
      methodInfo_Blog_List,
      callback);
};


/**
 * @param {!proto.BlogListReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.BlogListResp>}
 *     A native promise that resolves to the response
 */
proto.BlogPromiseClient.prototype.list =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/Blog/List',
      request,
      metadata || {},
      methodInfo_Blog_List);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.BlogAddReq,
 *   !proto.StatusResp>}
 */
const methodInfo_Blog_Add = new grpc.web.AbstractClientBase.MethodInfo(
  proto.StatusResp,
  /** @param {!proto.BlogAddReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.StatusResp.deserializeBinary
);


/**
 * @param {!proto.BlogAddReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.StatusResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.StatusResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.BlogClient.prototype.add =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/Blog/Add',
      request,
      metadata || {},
      methodInfo_Blog_Add,
      callback);
};


/**
 * @param {!proto.BlogAddReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.StatusResp>}
 *     A native promise that resolves to the response
 */
proto.BlogPromiseClient.prototype.add =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/Blog/Add',
      request,
      metadata || {},
      methodInfo_Blog_Add);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.BlogDelReq,
 *   !proto.StatusResp>}
 */
const methodInfo_Blog_Del = new grpc.web.AbstractClientBase.MethodInfo(
  proto.StatusResp,
  /** @param {!proto.BlogDelReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.StatusResp.deserializeBinary
);


/**
 * @param {!proto.BlogDelReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.StatusResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.StatusResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.BlogClient.prototype.del =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/Blog/Del',
      request,
      metadata || {},
      methodInfo_Blog_Del,
      callback);
};


/**
 * @param {!proto.BlogDelReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.StatusResp>}
 *     A native promise that resolves to the response
 */
proto.BlogPromiseClient.prototype.del =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/Blog/Del',
      request,
      metadata || {},
      methodInfo_Blog_Del);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.BlogUpdateReq,
 *   !proto.StatusResp>}
 */
const methodInfo_Blog_Update = new grpc.web.AbstractClientBase.MethodInfo(
  proto.StatusResp,
  /** @param {!proto.BlogUpdateReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.StatusResp.deserializeBinary
);


/**
 * @param {!proto.BlogUpdateReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.StatusResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.StatusResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.BlogClient.prototype.update =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/Blog/Update',
      request,
      metadata || {},
      methodInfo_Blog_Update,
      callback);
};


/**
 * @param {!proto.BlogUpdateReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.StatusResp>}
 *     A native promise that resolves to the response
 */
proto.BlogPromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/Blog/Update',
      request,
      metadata || {},
      methodInfo_Blog_Update);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.BlogGetTokenReq,
 *   !proto.BlogGetTokenResp>}
 */
const methodInfo_Blog_GetToken = new grpc.web.AbstractClientBase.MethodInfo(
  proto.BlogGetTokenResp,
  /** @param {!proto.BlogGetTokenReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.BlogGetTokenResp.deserializeBinary
);


/**
 * @param {!proto.BlogGetTokenReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.BlogGetTokenResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.BlogGetTokenResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.BlogClient.prototype.getToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/Blog/GetToken',
      request,
      metadata || {},
      methodInfo_Blog_GetToken,
      callback);
};


/**
 * @param {!proto.BlogGetTokenReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.BlogGetTokenResp>}
 *     A native promise that resolves to the response
 */
proto.BlogPromiseClient.prototype.getToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/Blog/GetToken',
      request,
      metadata || {},
      methodInfo_Blog_GetToken);
};


module.exports = proto;

