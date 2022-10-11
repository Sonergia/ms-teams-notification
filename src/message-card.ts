import {PotentialAction} from './models'

export function createMessageCard(messageCardObj: {[key: string]: any}): any {
  let avatar_url = messageCardObj?.author?.avatar_url
    ? messageCardObj.author.avatar_url
    : 'https://www.gravatar.com/avatar/05b6d8cc7c662bf81e01b39254f88a48?d=identicon'

  if (messageCardObj.viewChanges) {
    messageCardObj.potentialAction.unshift(
      new PotentialAction('View Commit Changes', [
        messageCardObj.commit.data.html_url
      ])
    )
  }

  if (messageCardObj.viewWorkflowRun) {
    messageCardObj.potentialAction.unshift(
      new PotentialAction('View Workflow Run', [
        `${messageCardObj.repoUrl}/actions/runs/${messageCardObj.runId}`
      ])
    )
  }

  if (messageCardObj.viewPullRequest && messageCardObj.pullNumber != '') {
    let name = 'View Pull Request'
    let target = [`${messageCardObj.repoUrl}/pull/${messageCardObj.pullNumber}`]

    if (messageCardObj.pullReview) {
      name = 'View Review'
      target = [messageCardObj.pullReview]
    }
    messageCardObj.potentialAction.unshift(new PotentialAction(name, target))
  }

  const messageCard = {
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions',
    summary: messageCardObj.notificationSummary,
    themeColor: messageCardObj.notificationColor,
    title: messageCardObj.notificationSummary,
    text: messageCardObj.description,
    sections: [
      {
        activityTitle: `**CI #${
          messageCardObj.runNum
        } (commit ${messageCardObj.sha.substring(0, 7)})** on [${
          messageCardObj.repoName
        }](${messageCardObj.repoUrl})`,
        activityImage: avatar_url,
        activitySubtitle: `by ${messageCardObj.commit.data.commit.author.name}
          [(@${messageCardObj.author.login})](${messageCardObj.author.html_url})
          on ${messageCardObj.timestamp}`,
        facts: messageCardObj.factsObj
      }
    ],
    potentialAction: messageCardObj.potentialAction
  }

  if (messageCardObj.potentialAction.length > 0) {
    messageCard.potentialAction = messageCardObj.potentialAction
  }
  return messageCard
}
