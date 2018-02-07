'use strict';

const PubSub = require('@google-cloud/pubsub');

const Publisher = function( projectId, topicName ) {
  this.projectId = projectId;
  this.topicName = topicName;
}

Publisher.prototype.send = function() {
  // Your Google Cloud Platform project ID
  const projectId = this.projectId;

  // Instantiates a client
  const pubsub = new PubSub({
    projectId: projectId,
  });

  // The name for the new topic
  const topicName = this.topicName;

  /**
   * TODO(developer): Uncomment the following lines to run the sample.
   */
  // const topicName = 'your-topic';
  // const data = JSON.stringify({ foo: 'bar' });

  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from('Publish from cron!');

  pubsub
    .topic(topicName)
    .publisher()
    .publish(dataBuffer)
    .then(results => {
      const messageId = results[0];
      console.log(`Message ${messageId} published.`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
// [END pubsub_publish_message]
}

module.exports = Publisher;
