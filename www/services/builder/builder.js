(function () {
  'use strict';

  angular
    .module('starter')
    .factory('builder', builder);

  builder.$inject = [];

  function builder() {
    return {
      Activity: Activity,
      Line: Line,
      FreeText: FreeText
    };

    function Activity(element) {
      var el = element.Activity;

      var child = ActivityBlock(el);

      var header = ActivityHeader(el);
      child.append(header);

      var content = ActivityContent(el);
      child.append(content);

      var footer = ActivityFooter(el);
      child.append(footer);

      return child;
    }

    function ActivityBlock(el) {
      var child = angular.element('<div></div>');
      child.css({'width': (parseInt(el.x2) - parseInt(el.x1)) + 'px'});
      child.css('min-height', (parseInt(el.y2) - parseInt(el.y1) + 20) + 'px');
      child.css('border', el.LineWidth + 'px ' + el.LineStyle + " " + getColor(el.LineColor));
      child.css('border-radius', '3px');
      child.css('position', 'absolute');
      child.css('top', el.y1 + 'px');
      child.css('left', el.x1 + 'px');
      child.css('background', 'linear-gradient(to top,' + getColor(el.FillColor) + ', #fff)');
      child.addClass('ActivityBlock');
      return child;
    }

    function ActivityHeader(el) {
      var header = angular.element('<div class="ActivityBlock-header"></div>');
      var icon = angular.element('<span class="header-icon-block"></span>');
      //<button ng-click="vm.goToResources()">
      if(el.DrillDown !== undefined){
        var headerIconDownload = angular.element('<i class="icon ion-ios-cloud-download func"></i>');
        icon.append(headerIconDownload);
      }

      var headerIcon = angular.element('<span aria-hidden="true">&times;</span>');
      icon.append(headerIcon);
      header.append(icon);

      var headerTitle = angular.element('<span class="ActivityHeader-title">' + el['xmi.id'].substring(4) + '</span>');
      header.append(headerTitle);

      return header;
    }

    function ActivityContent(el) {
      var content = angular.element('<div>' + el.name + '</div>');
      content.addClass('ActivityBlock-content');
      return content;
    }

    function ActivityFooter(el) {
      var footer;
      if (angular.isArray(el.RequiredResource)) {
        footer = angular.element('<div></div>');
        el.RequiredResource.forEach(function (item) {
          var titleFooter = angular.element('<div>' + item['CONTROL:ResName'] + '</div>');
          footer.append(titleFooter);
        })
      }
      else {
        if (el.RequiredResource) {
          footer = angular.element('<div>' + el.RequiredResource.ResName + '</div>');
        }
        else {
          footer = angular.element('<div></div>');
        }
      }
      footer.addClass('ActivityBlock-footer');
      return footer;
    }


    function FreeText(el) {
      var freeText = el.FreeText;
      var FillGradient = el.FillGradient;

      var child = angular.element('<div></div>');
      child.css({'width': (parseInt(freeText.x2) - parseInt(freeText.x1)) + 'px'});
      child.css('height', (parseInt(freeText.y2) - parseInt(freeText.y1)) + 'px');
      child.css('border', FillGradient.LineWidth + 'px ' + FillGradient.LineStyle + " " + getColor(FillGradient.LineColor));
      child.css('border-radius', '3px');
      child.css('position', 'absolute');
      child.css('top', freeText.y1 + 'px');
      child.css('left', freeText.x1 + 'px');
      //child.css('background', 'linear-gradient(to top,' + getColor(freeText.FillColor) + ', #fff)');
      //child.css('background', 'black');

      if (freeText.Text !== null) {
        var text = angular.element('<span>' + freeText.Text + '</span>');
        text.css('padding', '10px');
        text.css('position', 'absolute');
        child.append(text);
      }

      return child;
    }


    function Line(element) {
      var el = element.Line;

      var lineBlock = LineBlock(el);

      return lineBlock;
    }

    function LineBlock(el) {
      var childArr = [];
      var child;
      var childTitle = angular.element('<span class="titleLine">' + el.name + '</span>');
      childTitle.css('bottom', '0px');
      if (el.x2 === el.x1) {
        childArr = [];

        if (el.sourceName === "") {
          child = angular.element('<div class="cross"><span aria-hidden="true">×</span></div>');
          child.css('top', (parseInt(el.y1)) - 10 + 'px');
          child.css('left', parseInt(el.x1) - 5 + 'px');
          childArr.push(child);
        }

        child = angular.element('<div></div>');
        child.addClass('lineBlock-vertical');
        childTitle.addClass('lineTitle-vertical');
        child.append(childTitle);

        if (parseInt(el.y2) > parseInt(el.y1)) {
          child.css({'height': (parseInt(el.y2) - parseInt(el.y1)) + 'px'});
          child.css('top', el.y1 + 'px');

          var childTrigon = angular.element('<div class="trigon-bottom"></div>');
          childTrigon.css('top', (parseInt(el.y2)) + 5 + 'px');
          childTrigon.css('left', parseInt(el.x2) + 'px');
          childArr.push(childTrigon);
        }
        else {
          child.css({'height': (parseInt(el.y1) - parseInt(el.y2)) + 'px'});
          child.css('top', el.y2 + 'px');

          var childTrigon = angular.element('<div class="trigon-top"></div>');
          childTrigon.css('top', (parseInt(el.y2)) + 5 + 'px');
          childTrigon.css('left', parseInt(el.x2) + 'px');
          childArr.push(childTrigon);
        }
        child.css('position', 'absolute');
        child.css('left', el.x1 + 'px');
        child.css('border-right', '1px solid black');
        childArr.push(child);

        return childArr;
      }
      else if (el.y2 === el.y1) {

        if (el.DestEdge === 'Bottom') {
          if (el.SourceEdge === 'Bottom') {
            return LineBlockZipLineBottomToBottom(el);
          }
          else if (el.SourceEdge === 'Right') {
            //?????
            console.log(el);
            return LineBlockY(el)
          }
        }
        else if (el.DestEdge === 'Top') {
          if (el.SourceEdge === 'Top') {
            return LineBlockZipLineBottomToTopY(el);
          }
          else if(el.SourceEdge === 'Right'){
            return LineBlockY(el);
          }

        }
        else if(el.DestEdge === 'Bottom'){
          if (el.SourceEdge === 'Right') {
            //???
            console.log(el);
            return LineBlockY(el);
          }
        }
        else {
          return LineBlockY(el)
        }
      }
      else {
        childArr = [];
        if (el.SourceEdge === 'Right') {
          if (el.DestEdge === 'Bottom') {
            childArr = LineBlockZipLineRightToTop(el);
          }
          else if (el.DestEdge === 'Left') {
            if (parseInt(el.x1) > parseInt(el.x2)) {
              childArr = LineBlockZipLineRightToLeft(el);
            }
            else if (parseInt(el.x1) < parseInt(el.x2)) {
              childArr = LineBlockZipLineRight(el);
            }
          }
          else if (el.DestEdge === 'Top') {
            console.log(el);
            childArr = LineBlockZipLineRightToTopTwo(el);
          }
        }
        else if (el.SourceEdge === 'Bottom') {
          if (el.DestEdge === 'Left') {
            childArr = LineBlockZipLineBottomToLeft(el);
          }
          else if (el.DestEdge === 'Top') {
            childArr = LineBlockZipLineBottomToTop(el);
          }
          else if (el.DestEdge === 'Right') {
            childArr = LineBlockZipLineBottom(el);
          }
          else if (el.DestEdge === 'Bottom') {
            //???
            childArr = LineBlockZipLineBottomToBottom(el);
          }
        }
        else if (el.SourceEdge === 'Top') {
          if (el.DestEdge === 'Right') {
            childArr = LineBlockZipLineTopToRight(el);
          }
          else if (el.DestEdge === 'Left') {
            childArr = LineBlockZipLineTopToLeft(el);
          }
        }
        else if (el.SourceEdge === 'Left') {
          if (el.DestEdge === 'Top') {
            childArr = LineBlockZipLineLeftToTop(el);
          }
        }
        return childArr;
      }
    }

    function LineBlockZipLineRight(el) {
      //delete
      var childArr = [];
      var childTitle = angular.element('<span class="titleLine-zigZag">' + el.name + '</span>');
      childTitle.css('bottom', '0px');

      var childZip = angular.element('<div></div>');
      childZip.append(childTitle);
      childZip.addClass('lineBlock-south-north');
      childZip.css({'width': (parseInt(el.x2) - parseInt(el.x1)) - 20 + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('top', parseInt(el.y1) + 'px');
      childZip.css('left', (el.x1) + 'px');
      childZip.css('border-bottom', '1px solid black');
      childArr.push(childZip);

      childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      if (parseInt(el.y1) > parseInt(el.y2)) {
        childZip.css({'height': (parseInt(el.y1) - parseInt(el.y2)) + 'px'});
        childZip.css('top', (parseInt(el.y2)) + 'px');
        childZip.css('border-top', '1px solid black');
      } else {
        childZip.css({'height': (parseInt(el.y2) - parseInt(el.y1)) + 'px'});
        childZip.css('top', (parseInt(el.y1)) + 'px');
        childZip.css('border-bottom', '1px solid black');
      }
      childZip.css({'width': 20 + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('left', parseInt(el.x2) - 20 + 'px');
      childZip.css('border-left', '1px solid black');
      childArr.push(childZip);

      childZip = angular.element('<div class="trigon-right"></div>');
      childZip.css('top', (parseInt(el.y2) + 4) + 'px');
      childZip.css('left', parseInt(el.x2) - 2 + 'px');
      childArr.push(childZip);

      return childArr;
    }

    function LineBlockZipLineBottom(el) {
      var childArr = [];
      var childTitle = angular.element('<span class="titleLine-zigZag">' + el.name + '</span>');

      var childZip = angular.element('<div></div>');

      childZip.addClass('lineBlock-south-north');
      childZip.css({'height': 11 + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('top', parseInt(el.y1) - 10 + 'px');
      childZip.css('left', (el.x1) + 'px');
      childZip.css('border-left', '1px solid black');
      childArr.push(childZip);

      childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      childZip.append(childTitle);
      childZip.css({'width': (parseInt(el.x1) - parseInt(el.x2)) + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('top', el.y1 + 'px');
      childZip.css('left', (el.x2) + 'px');
      childZip.css('border-bottom', '1px solid black');
      childArr.push(childZip);
      //
      childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      childZip.css({'height': (parseInt(el.y1) - parseInt(el.y2)) + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('top', (parseInt(el.y2)) + 'px');
      childZip.css('left', (el.x2) + 'px');
      childZip.css('border-left', '1px solid black');
      childArr.push(childZip);

      childZip = angular.element('<div class="trigon-top"></div>');
      childZip.css('top', (parseInt(el.y2)) + 'px');
      childZip.css('left', (el.x2) + 'px');
      childArr.push(childZip);

      return childArr;
    }

    function LineBlockZipLineRightToTop(el) {
      var childArr = [];
      var childTitle = angular.element('<span class="titleLine-zigZag">' + el.name + '</span>');

      var childZip = angular.element('<div></div>');
      childZip.append(childTitle);
      childZip.addClass('lineBlock-south-north');
      childZip.css({'width': parseInt(el.x2) - parseInt(el.x1) + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('top', parseInt(el.y1) + 'px');
      childZip.css('left', (el.x1) + 'px');
      childZip.css('border-bottom', '1px solid black');
      childArr.push(childZip);

      childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      childZip.css({'height': (parseInt(el.y1) - parseInt(el.y2)) + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('top', (parseInt(el.y2)) + 'px');
      childZip.css('left', (el.x2) + 'px');
      childZip.css('border-right', '1px solid black');
      childArr.push(childZip);

      childZip = angular.element('<div class="trigon-top"></div>');
      childZip.css('top', (parseInt(el.y2)) + 'px');
      childZip.css('left', (el.x2) + 'px');
      childArr.push(childZip);

      return childArr;
    }

    function LineBlockZipLineRightToTopTwo(el) {
      var childArr = [];
      var childTitle = angular.element('<span class="titleLine-zigZag">' + el.name + '</span>');

      var childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      childZip.css({'height': ((parseInt(el.y2) - parseInt(el.y1)) / 2)+ 30 + 'px'});
      childZip.css({'width': '10px'});
      childZip.css('position', 'absolute');
      childZip.css('top', el.y1 + 'px');
      childZip.css('left', parseInt(el.x1) + 'px');
      childZip.css('border-right', '1px solid black');
      childZip.css('border-top', '1px solid black');
      childZip.css('border-bottom', '1px solid black');
      childArr.push(childZip);

      childZip = angular.element('<div></div>');
      childZip.append(childTitle);
      childZip.addClass('lineBlock-south-north');
      childZip.css({'width': (parseInt(el.x1) - parseInt(el.x2)) + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('top', (((parseInt(el.y2) - parseInt(el.y1)) / 2 + parseInt(el.y1)) + 29) + 'px');
      childZip.css('left', parseInt(el.x2) + 'px');
      childZip.css('border-bottom', '1px solid black');
      childArr.push(childZip);

      childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      childZip.css({'height': ((parseInt(el.y2) - parseInt(el.y1)) / 2)-30 + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('top', ((parseInt(el.y2) - parseInt(el.y1)) / 2 + parseInt(el.y1)+ 30) - 1 + 'px');
      childZip.css('left', parseInt(el.x2)+ 'px');
      childZip.css('border-left', '1px solid black');
      childArr.push(childZip);

      var childZip = angular.element('<div class="trigon-bottom"></div>');
      childZip.css('top', (parseInt(el.y2) + 3) + 'px');
      childZip.css('left', parseInt(el.x2) + 'px');
      childArr.push(childZip);

      return childArr;
    }

    function LineBlockZipLineRightToLeft(el) {
      var childArr = [];
      var childTitle = angular.element('<span class="titleLine-zigZag">' + el.name + '</span>');

      var childZip = angular.element('<div class="trigon-right"></div>');
      childZip.css('top', (parseInt(el.y2) + 3) + 'px');
      childZip.css('left', parseInt(el.x2) + 'px');
      childArr.push(childZip);

      childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      childZip.css({'height': (parseInt(el.y2) - parseInt(el.y1)) / 2 + 'px'});
      childZip.css({'width': '10px'});
      childZip.css('position', 'absolute');
      childZip.css('top', el.y1 + 'px');
      childZip.css('left', parseInt(el.x1) + 'px');
      childZip.css('border-right', '1px solid black');
      childZip.css('border-top', '1px solid black');
      childZip.css('border-bottom', '1px solid black');
      childArr.push(childZip);

      childZip = angular.element('<div></div>');
      childZip.append(childTitle);
      childZip.addClass('lineBlock-south-north');
      childZip.css({'width': (parseInt(el.x1) - parseInt(el.x2)) + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('top', (((parseInt(el.y2) - parseInt(el.y1)) / 2 + parseInt(el.y1)) - 1) + 'px');
      childZip.css('left', parseInt(el.x2) + 'px');
      childZip.css('border-bottom', '1px solid black');
      childArr.push(childZip);

      childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      childZip.css({'height': (parseInt(el.y2) - parseInt(el.y1)) / 2 + 'px'});
      childZip.css({'width': '10px'});
      childZip.css('position', 'absolute');
      childZip.css('top', ((parseInt(el.y2) - parseInt(el.y1)) / 2 + parseInt(el.y1)) - 1 + 'px');
      childZip.css('left', parseInt(el.x2) - 10 + 'px');
      childZip.css('border-left', '1px solid black');
      childZip.css('border-top', '1px solid black');
      childZip.css('border-bottom', '1px solid black');
      childArr.push(childZip);

      return childArr;
    }

    function LineBlockZipLineBottomToLeft(el) {
      console.log(el);

      var childArr = [];
      var childTitle = angular.element('<span class="titleLine-zigZag">' + el.name + '</span>');

      var childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      childZip.css({'height': (parseInt(el.y2) - parseInt(el.y1)) + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('top', (parseInt(el.y1)) + 'px');
      childZip.css('left', (el.x1) + 'px');
      childZip.css('border-right', '1px solid black');
      childArr.push(childZip);

      childZip = angular.element('<div></div>');
      childZip.append(childTitle);
      childZip.addClass('lineBlock-south-north');
      childZip.css({'width': parseInt(el.x2) - parseInt(el.x1) + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('top', parseInt(el.y2) + 'px');
      childZip.css('left', (el.x1) + 'px');
      childZip.css('border-bottom', '1px solid black');
      childArr.push(childZip);

      childZip = angular.element('<div class="trigon-right"></div>');
      childZip.css('top', (parseInt(el.y2) + 5) + 'px');
      childZip.css('left', (el.x2) + 'px');
      childArr.push(childZip);

      return childArr;
    }

    function LineBlockZipLineBottomToTop(el) {
      var childArr = [];
      var childTitle = angular.element('<span class="titleLine-zigZag">' + el.name + '</span>');

      var childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      childZip.append(childTitle);

      if (parseInt(el.x2) > parseInt(el.x1)) {
        childZip.css({'width': (parseInt(el.x2) - parseInt(el.x1)) + 'px'});
        childZip.css('left', parseInt(el.x1) + 'px');
        childZip.css('border-left', '1px solid black');
      }
      else {
        childZip.css({'width': (parseInt(el.x1) - parseInt(el.x2)) + 'px'});
        childZip.css('left', parseInt(el.x2) + 'px');
        childZip.css('border-right', '1px solid black');
      }
      childZip.css('height', '20px');
      childZip.css('position', 'absolute');
      childZip.css('top', parseInt(el.y1) + 'px');
      childZip.css('border-bottom', '1px solid black');
      childArr.push(childZip);

      return childArr;
    }

    function LineBlockZipLineTopToRight(el) {
      var childArr = [];
      var childTitle = angular.element('<span class="titleLine-zigZag">' + el.name + '</span>');

      var childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      childZip.css({'height': (parseInt(el.y1) - parseInt(el.y2)) + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('left', parseInt(el.x1) + 'px');
      childZip.css('top', parseInt(el.y2) + 'px');
      childZip.css('border-left', '1px solid black');
      childArr.push(childZip);

      childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      childZip.append(childTitle);
      childZip.css({'width': (parseInt(el.x1) - parseInt(el.x2)) + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('left', parseInt(el.x2) + 'px');
      childZip.css('top', parseInt(el.y2) + 'px');
      childZip.css('border-bottom', '1px solid black');
      childArr.push(childZip);

      childZip = angular.element('<div class="trigon-left"></div>');
      childZip.css('top', (parseInt(el.y2) + 5) + 'px');
      childZip.css('left', (el.x2) + 'px');
      childArr.push(childZip);
      return childArr;
    }

    function LineBlockZipLineLeftToTop(el) {
      var childArr = [];
      var childTitle = angular.element('<span class="titleLine-zigZag">' + el.name + '</span>');

      var childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      childZip.css({'height': (parseInt(el.y2) - parseInt(el.y1)) + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('left', parseInt(el.x2) + 'px');
      childZip.css('top', parseInt(el.y1) + 'px');
      childZip.css('border-left', '1px solid black');
      childArr.push(childZip);

      childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      childZip.append(childTitle);
      childZip.css({'width': (parseInt(el.x1) - parseInt(el.x2)) + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('left', parseInt(el.x2) + 'px');
      childZip.css('top', parseInt(el.y1) + 'px');
      childZip.css('border-bottom', '1px solid black');
      childArr.push(childZip);

      childZip = angular.element('<div class="trigon-bottom"></div>');
      childZip.css('top', (parseInt(el.y2) + 5) + 'px');
      childZip.css('left', (el.x2) + 'px');
      childArr.push(childZip);
      return childArr;
    }

    function LineBlockZipLineTopToLeft(el) {
      var childArr = [];
      var childTitle = angular.element('<span class="titleLine-zigZag">' + el.name + '</span>');

      var childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      childZip.css({'height': (parseInt(el.y1) - parseInt(el.y2)) + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('left', parseInt(el.x1) + 'px');
      childZip.css('top', parseInt(el.y2) + 'px');
      childZip.css('border-left', '1px solid black');
      childArr.push(childZip);
      //
      childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      childZip.append(childTitle);
      childZip.css({'width': (parseInt(el.x2) - parseInt(el.x1)) + 'px'});
      childZip.css('position', 'absolute');
      childZip.css('left', parseInt(el.x1) + 'px');
      childZip.css('top', parseInt(el.y2) + 'px');
      childZip.css('border-bottom', '1px solid black');
      childArr.push(childZip);
      //
      childZip = angular.element('<div class="trigon-right"></div>');
      childZip.css('top', (parseInt(el.y2) + 5) + 'px');
      childZip.css('left', (el.x2) + 'px');
      childArr.push(childZip);
      return childArr;
    }

    function LineBlockZipLineBottomToBottom(el) {
      var childArr = [];
      console.log(el);
      var childTitle = angular.element('<span class="titleLine-zigZag">' + el.name + '</span>');
      childTitle.css('top', '30px');
      var childZip = angular.element('<div></div>');
      childZip.append(childTitle);

      childZip.addClass('lineBlock-south-north');
      childZip.css({'height': 50 + 'px'});
      if (parseInt(el.x2) > parseInt(el.x1)) {
        childZip.css({'width': (parseInt(el.x2) - parseInt(el.x1)) + 'px'});
        childZip.css('left', parseInt(el.x1) + 'px');
        childZip.css('position', 'absolute');
        childZip.css('top', parseInt(el.y2) + 'px');
        childZip.css('border-bottom', '1px solid black');
        childZip.css('border-left', '1px solid black');
        childZip.css('border-right', '1px solid black');
        childArr.push(childZip);
      }
      else {
        childZip.css({'width': (parseInt(el.x1) - parseInt(el.x2)) + 'px'});
        childZip.css('left', parseInt(el.x2) + 'px');

        childZip.css('position', 'absolute');
        childZip.css('top', parseInt(el.y1) + 'px');
        childZip.css('border-bottom', '1px solid black');
        childZip.css('border-left', '1px solid black');
        childZip.css('border-right', '1px solid black');
        childArr.push(childZip);

        childZip  = angular.element('<div></div>');
        childZip.css('position', 'absolute');
        childZip.css('top', parseInt(el.y2) + 'px');
        childZip.css('left', parseInt(el.x2) + 'px');
        childZip.css('border-left', '1px solid black');
        childZip.css('height', parseInt(el.y1) -parseInt(el.y2)+ 'px');
        childArr.push(childZip);
      }


      //
      childZip = angular.element('<div class="trigon-top"></div>');
      childZip.css('top', (parseInt(el.y2) + 10) + 'px');
      childZip.css('left', (el.x2) + 'px');
      childArr.push(childZip);
      return childArr;
    }

    function LineBlockZipLineBottomToTopY(el) {
      console.log(el);

      var childArr = [];
      var childTitle = angular.element('<span class="titleLine-zigZag">' + el.name + '</span>');
      childTitle.css('top', '-30px');
      var childZip = angular.element('<div></div>');
      childZip.addClass('lineBlock-south-north');
      childZip.append(childTitle);
      childZip.css({'height': 20 + 'px'});
      if (parseInt(el.x2) > parseInt(el.x1)) {
        childZip.css({'width': (parseInt(el.x2) - parseInt(el.x1)) + 'px'});
        childZip.css('left', parseInt(el.x1) + 'px');
      }
      else {
        childZip.css({'width': (parseInt(el.x1) - parseInt(el.x2)) + 'px'});
        childZip.css('left', parseInt(el.x2) + 'px');
      }
      childZip.css('position', 'absolute');
      childZip.css('top', parseInt(el.y2) - 20 + 'px');
      childZip.css('border-top', '1px solid black');
      childZip.css('border-left', '1px solid black');
      childZip.css('border-right', '1px solid black');
      childArr.push(childZip);
      //
      childZip = angular.element('<div class="trigon-bottom"></div>');
      childZip.css('top', (parseInt(el.y2) + 5) + 'px');
      childZip.css('left', (el.x2) + 'px');
      childArr.push(childZip);
      return childArr;
    }

    function LineBlockY(el) {
      var childArr = [];
      var child;
      var childTitle = angular.element('<span class="titleLine">' + el.name + '</span>');

      if (el.sourceName === "") {
        child = angular.element('<div class="cross"><span aria-hidden="true">×</span></div>');
        child.css('top', (parseInt(el.y2)) - 10 + 'px');
        child.css('left', parseInt(el.x1) - 5 + 'px');
        childArr.push(child);
      }

      if (el.sinkName === "") {
        child = angular.element('<div class="cross"><span aria-hidden="true">×</span></div>');
        child.css('top', (parseInt(el.y2)) - 10 + 'px');
        child.css('left', parseInt(el.x2) - 5 + 'px');
        childArr.push(child);
      }

      childTitle.addClass('lineTitle-horizontal');
      child = angular.element('<div></div>');
      child.addClass('lineBlock-horizontal');
      child.append(childTitle);
      child.css({'width': (parseInt(el.x2) - parseInt(el.x1)) + 'px'});
      child.css('position', 'absolute');
      child.css('top', parseInt(el.y1) + 'px');
      child.css('left', parseInt(el.x1) + 'px');
      child.css('border-top', '1px solid black');
      childArr.push(child);


      child = angular.element('<div class="trigon-right"></div>');
      child.css('top', (parseInt(el.y2)) + 5 + 'px');
      child.css('left', parseInt(el.x2) - 3 + 'px');
      childArr.push(child);

      return childArr;
    }


    //helpers
    function getColor(lineColor) {
      if (lineColor === undefined) return;
      if (lineColor.indexOf('; ') === -1) {
        return lineColor;
      }
      else {
        var r, g, b;
        lineColor.split('; ').forEach(function (item) {
          if (item.substring(0, 2) === 'R:') {
            r = item.substring(2);
          }
          else if (item.substring(0, 2) === 'G:') {
            g = item.substring(2);
          }
          else if (item.substring(0, 2) === 'B:') {
            b = item.substring(2);
          }
        });
        return 'rgb(' + r + ',' + g + ',' + b + ')';
      }

    }
  }
})();
