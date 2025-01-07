import { Octokit } from "octokit";

async function operateGitHubIssues(
  operationType,
  token,
  owner,
  repo,
  issueTitle,
  issueBody,
  issue_number
) {
  if (!operationType) {
    console.error(
      "操作を指定してください。ヘルプは -h または --help を指定してください。HTTPログを出力する場合は -v または --verbose を指定してください。"
    );
    return;
  }

  if (operationType === "-h" || operationType === "--help") {
    console.log(
      `引数
1.操作を指定します。(create(Issueの作成)、close(Issueのクローズ)、list(Issueの一覧表示)のいずれか)
2.トークンを指定します。
3.リポジトリのオーナーを指定します。
4.リポジトリ名を指定します。
5.作成する Issue のタイトルを指定します。(close, listの場合はプログラム中で使用しないので適当な文字列を入れてください)
6.作成する Issue の本文を指定します。(close, listの場合はプログラム中で使用しないので適当な文字列を入れてください)
7.クローズする Issue の番号を指定します。(create, listの場合はプログラム中で使用しないので適当な数字を入れてください)`
    );
    return;
  }

  if (operationType === "-v" || operationType === "--verbose") {
    // HTTPログを出力する
    // できていません。。
  }

  if (!token || !owner || !repo || !issueTitle || !issueBody || !issue_number) {
    console.error("引数が足りません");
    return;
  }

  // APIの使い方は以下を参照
  // https://docs.github.com/ja/rest/quickstart?apiVersion=2022-11-28&tool=javascript
  // トークンの取得方法は以下を参照
  // https://docs.github.com/ja/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
  const octokit = new Octokit({ auth: token });

  // コマンドライン引数によって処理を分岐する
  if (operationType === "create") {
    // Issueの作成
    const create = await octokit.request("POST /repos/{owner}/{repo}/issues", {
      owner: owner,
      repo: repo,
      title: issueTitle,
      body: issueBody,
    });
    console.log(create);
  } else if (operationType === "close") {
    // Issueのクローズ
    const close = await octokit.request(
      "PATCH /repos/{owner}/{repo}/issues/{issue_number}",
      {
        owner: owner,
        repo: repo,
        issue_number: issue_number,
        state: "closed",
      }
    );
    console.log(close);
  } else if (operationType === "list") {
    // オープンな Issue の Id と Title の一覧を表示
    const list = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: owner,
      repo: repo,
      state: "open",
    });
    // Id と Title の一覧を表示
    list.data.forEach((issue) => {
      console.log(issue.number, issue.title);
    });
  }
}

operateGitHubIssues(
  process.argv[2],
  process.argv[3],
  process.argv[4],
  process.argv[5],
  process.argv[6],
  process.argv[7],
  process.argv[8]
);
