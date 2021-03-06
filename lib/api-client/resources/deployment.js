'use strict';

var AbstractClientResource = require('./../abstract-client-resource');



/**
 * Deployment Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var Deployment = AbstractClientResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
Deployment.path = 'deployment';


/**
 * Create a deployment
 * @param  {Object} options
 *
 * @param  {Array} options.files
 *
 * @param  {String} options.deploymentName
 * @param  {String} [options.enableDuplicateFiltering]
 * @param  {String} [options.deployChangedOnly]
 * @param  {Function} done
 */
Deployment.create = function (options, done) {
  var fields = {
    'deployment-name': options.deploymentName
  };
  var files = Array.isArray(options.files) ?
              options.files :
              [options.files];

  if (options.enableDuplicateFiltering) {
    fields['enable-duplicate-filtering'] = 'true';
  }

  if (options.deployChangedOnly) {
    fields['deploy-changed-only'] = 'true';
  }

  return this.http.post(this.path +'/create', {
    data:         {},
    fields:       fields,
    attachments:  files,
    done:         done
  });
};



/**
 * Lists the deployments
 * @param  {Object}   params                An object containing listing options.
 * @param  {uuid}     [params.id]           Filter by deployment id.
 * @param  {String}   [params.name]         Filter by the deployment name. Exact match.
 * @param  {String}   [params.nameLike]     Filter by the deployment name that the parameter is a
 *                                          substring of. The parameter can include the wildcard %
 *                                          to express like-strategy such as: starts with (%name),
 *                                          ends with (name%) or contains (%name%).
 * @param  {String}   [params.after]        Restricts to all deployments after the given date.
 *                                          The date must have the format yyyy-MM-dd'T'HH:mm:ss,
 *                                          e.g., 2013-01-23T14:42:45
 * @param  {String}   [params.before]       Restricts to all deployments before the given date.
 *                                          The date must have the format yyyy-MM-dd'T'HH:mm:ss,
 *                                          e.g., 2013-01-23T14:42:45
 * @param  {String}   [params.sortBy]       Sort the results lexicographically by a given criterion.
 *                                          Valid values are id, name and deploymentTime. Must be
 *                                          used in conjunction with the sortOrder parameter.
 * @param  {String}   [params.sortOrder]    Sort the results in a given order. Values may be asc for
 *                                          ascending order or desc for descending order. Must be
 *                                          used in conjunction with the sortBy parameter.
 * @param  {Integer}  [params.firstResult]  Pagination of results. Specifies the index of the first
 *                                          result to return.
 * @param  {Integer}  [params.maxResults]   Pagination of results. Specifies the maximum number of
 *                                          results to return. Will return less results if there are
 *                                          no more results left.
 * @param  {Function} done
 */
Deployment.list = function () {
  AbstractClientResource.list.apply(this, arguments);
};


module.exports = Deployment;
