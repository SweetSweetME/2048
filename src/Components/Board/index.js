/**
 * 第一步：先计算
 * 第二步：将数字贴边->不为0的取出，统一设为0，在贴边放进去-->进一步思考，取出放进新的数组，同时还可以创建随机的值
 * 第三步：出现随机数字
 */
import React, { Component } from 'react';
import _ from 'lodash';
import Row from '.././Row';
import './index.less';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: this.CARDS,
            isPlaying: false,
            spendTime: 0,
            timer: null,
            rank: 2048
        };
    }

    CARDS = [[0, 0, 0, 2], [0, 0, 0, 0], [0, 2, 0, 2], [0, 2, 0, 2]];
    RANK = {
        32: '极简',
        256: '简单',
        1024: '中度',
        2048: '困难'
    }

    beginGame = () => {
        alert('使用键盘方向键哦～');
        document.onkeyup = this.play;
        const timer = setInterval(() => {
            this.setState({
                spendTime: this.state.spendTime + 1
            });
        }, 1000);
        this.setState({
            isPlaying: !this.state.isPlaying,
            timer: timer
        });
    }

    play = (e) => {
        const arr = this.state.cards;
        switch (e.code) {
            case 'ArrowUp':
                this.move(arr, 'ArrowUp');
                break;
            case 'ArrowRight':
                this.move(arr, 'ArrowRight');
                break;
            case 'ArrowDown':
                this.move(arr, 'ArrowDown');
                break;
            case 'ArrowLeft':
                this.move(arr, 'ArrowLeft');
                break;
            default:
                break;
        }
    }

    move = (arr, direction) => {
        const len = arr.length;
        let resultArr = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        let m = 0, n;
        switch (direction) {
            case 'ArrowDown':
                // case1：下  列不变 行递减 3->0 计算
                // 第一步：
                for (let i = 0; i < len; i++) {
                    for (let j = len - 1; j > 0; j--) { // 判断到下标为1的即可 因为下标为0时也不会再有下一个值需要再判断
                        if (arr[j][i] === arr[j - 1][i]) { // 值相同则相加(当前值乘2) 即使：0+0=0(0*2=0)
                            arr[j][i] *= 2;
                            arr[j - 1][i] = 0; // 下一个值置为0 不影响接下来的值判断 0也不影响
                            j--; // j-1对应的值不用再和其他的判断 跨过去
                        } else if (arr[j - 1][i] === 0 && j - 2 >= 0 && arr[j][i] === arr[j - 2][i]) { // 中间是空格 也能加
                            arr[j][i] *= 2;
                            arr[j - 2][i] = 0; // 下一个值置为0 不影响接下来的值判断 0也不影响
                            j -= 2; // j-1对应的值不用再和其他的判断 跨过去
                        }
                    }
                }
                // 第二步：
                for (let i = 0; i < len; i++) {
                    n = len - 1;
                    for (let j = len - 1; j >= 0; j--) { // 注意 <=
                        if (arr[j][i] !== 0) {
                            resultArr[n--][m] = arr[j][i];
                        }
                    }
                    m++;
                }
                break;
            case 'ArrowUp':
                // case2：上  列不变 行递增 0->3 计算
                // 第一步：
                for (let i = 0; i < len; i++) {
                    for (let j = 0; j < len - 1; j++) { // 判断到下标为1的即可 因为下标为0时也不会再有下一个值需要再判断
                        if (arr[j][i] === arr[j + 1][i]) { // 值相同则相加(当前值乘2) 即使：0+0=0(0*2=0)
                            arr[j][i] *= 2;
                            arr[j + 1][i] = 0; // 下一个值置为0 不影响接下来的值判断 0也不影响
                            j++; // j+1对应的值不用再和其他的判断 跨过去
                        } else if (arr[j + 1][i] === 0 && j + 2 <= len - 1 && arr[j][i] === arr[j + 2][i]) { // 中间是空格 也能加
                            arr[j][i] *= 2;
                            console.log(arr[j + 2][i]);
                            arr[j + 2][i] = 0; // 下一个值置为0 不影响接下来的值判断 0也不影响
                            j += 2; // j-1对应的值不用再和其他的判断 跨过去
                        }
                    }
                }
                // 第二步：
                for (let i = 0; i < len; i++) {
                    n = 0;
                    for (let j = 0; j <= len - 1; j++) { // 注意 <=
                        if (arr[j][i] !== 0) {
                            resultArr[n++][m] = arr[j][i];
                        }
                    }
                    m++;
                }
                break;
            case 'ArrowRight':
                // case3：右  列不变 行递减 3->0 计算   换 i j 换 m n 
                // 第一步：
                for (let i = 0; i < len; i++) {
                    for (let j = len - 1; j > 0; j--) { // 判断到下标为1的即可 因为下标为0时也不会再有下一个值需要再判断
                        if (arr[i][j] === arr[i][j - 1]) { // 值相同则相加(当前值乘2) 即使：0+0=0(0*2=0)
                            arr[i][j] *= 2;
                            arr[i][j - 1] = 0; // 下一个值置为0 不影响接下来的值判断 0也不影响
                            j--; // j-1对应的值不用再和其他的判断 跨过去
                        } else if (arr[i][j - 1] === 0 && j - 2 >= 0 && arr[i][j] === arr[i][j - 2]) { // 中间是空格 也能加
                            arr[i][j] *= 2;
                            arr[i][j - 2] = 0; // 下一个值置为0 不影响接下来的值判断 0也不影响
                            j -= 2; // j-1对应的值不用再和其他的判断 跨过去
                        }
                    }
                }
                // 第二步：
                for (let i = 0; i < len; i++) {
                    n = len - 1;
                    for (let j = len - 1; j >= 0; j--) { // 注意 <=
                        if (arr[i][j] !== 0) {
                            resultArr[m][n--] = arr[i][j];
                        }
                    }
                    m++;
                }
                break;
            case 'ArrowLeft':
                // case4：左  行不变 列递增 0->3 计算  换 i j 换 m n 
                // 第一步：
                for (let i = 0; i < len; i++) {
                    for (let j = 0; j < len - 1; j++) { // 判断到下标为1的即可 因为下标为0时也不会再有下一个值需要再判断
                        if (arr[i][j] === arr[i][j + 1]) { // 值相同则相加(当前值乘2) 即使：0+0=0(0*2=0)
                            arr[i][j] *= 2;
                            arr[i][j + 1] = 0; // 下一个值置为0 不影响接下来的值判断 0也不影响
                            j++; // j+1对应的值不用再和其他的判断 跨过去
                        } else if (arr[i][j + 1] === 0 && j + 2 <= len - 1 && arr[i][j] === arr[i][j + 2]) { // 中间是空格 也能加
                            arr[i][j] *= 2;
                            arr[i][j + 2] = 0; // 下一个值置为0 不影响接下来的值判断 0也不影响
                            j += 2; // j-1对应的值不用再和其他的判断 跨过去
                        }
                    }
                }
                // 第二步：
                for (let i = 0; i < len; i++) {
                    n = 0;
                    for (let j = 0; j <= len - 1; j++) { // 注意 <=
                        if (arr[i][j] !== 0) {
                            resultArr[m][n++] = arr[i][j];
                        }
                    }
                    m++;
                }
                break;
            default:
                break;
        }

        // 第三步：
        for (let k = 0; k < len * 2; k++) {
            let i = parseInt(Math.random() * 4);
            let j = parseInt(Math.random() * 4);
            if (resultArr[i][j] === 0) {
                resultArr[i][j] = 2;
            }
        }

        this.setState({ cards: resultArr });
        setTimeout(() => {
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len; j++) {
                    if (resultArr[i][j] === 32) {
                        const { state: { spendTime, timer } } = this;
                        alert('恭喜闯关成功！用时：' + spendTime + '秒');
                        clearInterval(timer);
                        this.setState({
                            cards: this.CARDS,
                            isPlaying: !this.state.isPlaying
                        });
                        document.onkeyup = () => { };
                        break;
                    }
                }
            }
        }, 0);
    }

    render() {
        const cards = this.state.cards;
        const { state: { isPlaying, spendTime, rank } } = this;
        return (
            <div className="game">
                <h2>{isPlaying ? '用时：' + spendTime + '秒' : '欢迎体验 2048 网页版游戏 ！'}</h2>
                <div className="board">
                    {
                        _.map(cards, (item, index) => {
                            return <Row key={index} rowData={item} rank={rank} />
                        })
                    }
                </div>
                <button
                    className={isPlaying ? 'playing' : ''}
                    onClick={this.beginGame}
                    disabled={isPlaying}
                >开始游戏</button>
            </div>

        );
    }
}