import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { List } from 'app/modules/main/apps/scrumboard/list.model';
import { ScrumboardService } from 'app/modules/main/apps/scrumboard/scrumboard.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
    selector: 'scrumboard-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ScrumboardBoardComponent implements OnInit, OnDestroy {
    board: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _location: Location,
        private _scrumboardService: ScrumboardService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._scrumboardService.onBoardChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(board => {
                this.board = board;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On list add
     *
     * @param newListName
     */
    onListAdd(newListName): void {
        if (newListName === '') {
            return;
        }

        this._scrumboardService.addList(new List({ name: newListName }));
    }

    /**
     * On board name changed
     *
     * @param newName
     */
    onBoardNameChanged(newName): void {
        this._scrumboardService.updateBoard();
        this._location.go('/apps/scrumboard/boards/' + this.board.id + '/' + this.board.uri);
    }

    /**
     * On drop
     *
     * @param ev
     */
    onDrop(ev): void {
        this._scrumboardService.updateBoard();
    }
}
