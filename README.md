# tiny-marquee
基于 jQuery 的轻量级无缝滚动插件，滚动功能由 jQuery 的 animate 方法实现。

## 如何使用

### 引入 jQuery 和 tiny-marquee
    <script src="jquery-3.2.0.min.js"></script>
    <script src="jquery.tinymarquee.min.js"></script>
  
### HTML 结构
    <div class="marquee">
      <ul style="margin: 0; padding: 0;">
          <li>marquee1</li>
          <li>marquee2</li>
          <li>marquee3</li>
      </ul>
    </div>
    
### 调用方法同时配置参数
    <script>
      var mq = $(".marquee").marquee({
        interval: 3000
      });
    </script>

## 参数列表
    {
      interval: 3000  //滚动时间间隔（毫秒）
    }

## 自适应布局
当触发 $(window).resize() 事件时，tiny-marquee 会自动适应父级容器宽度，实现重新布局。
