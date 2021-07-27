/*
 * @Author: your name
 * @Date: 2021-07-27 17:38:32
 * @LastEditTime: 2021-07-27 17:49:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/icpview/screens/epoch/components/tootips.js
 */

function Tooltip({ text, children }) {
    return (
        <div className="mytooltip">
            {children}
            <span className="tooltiptext">{text}</span>
        </div>
    )
}
export default Tooltip
